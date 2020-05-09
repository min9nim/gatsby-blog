---
layout: post
title:  "[GraphQL] subscription 테스트 클라이언트"
date:   2019-05-15 00:10
categories: nodejs
tags: [nodejs, client, graphql]
---
본 글은 apollo-server-express 에서 subscription 기능을 사용할 때 테스트케이스 작성시 필요한 pubsub 클라이언트 코드를 공유한다.

테스트케이스는 노드환경에서 직접 구독요청을 서버로 올리고 그에 대한 응답을 확인할 수 있어야 한다. 그러려면 당장 노드 환경에서 pubsub 요청을 올릴 수 있는 클라이언트 작성이 필요하다

apollo 소스를 이러지리 뒤져가며 짜집기해서 완성했던 클라이언트 소스를 공유한다.

<br>

#### create-pubsub-client.ts
```typescript
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient, MutationOptions, SubscriptionOptions} from 'apollo-client'
import {Observable} from 'apollo-client/util/Observable'
import {FetchResult} from 'apollo-link'
import {WebSocketLink} from 'apollo-link-ws'
import http, {Server} from 'http'
import {AddressInfo} from 'net'
import {SubscriptionClient} from 'subscriptions-transport-ws'
import {format} from 'url'
import NodeWebSocket from 'ws'

export interface IServerInfo {
  address: string
  family: string
  url: string
  subscriptionsUrl: string
  port: number | string
  subscriptionsPath: string
  server: http.Server
}

export interface IPubSubClient {
  subscribe(options: SubscriptionOptions): Observable<any>
  mutate(options: MutationOptions): Promise<FetchResult>
  close(isForced?: boolean, closedByUser?: boolean): void
}

/**
 * Referenced from https://bit.ly/2UadwpO
 */
export default function createPubSubClient(
  server: Server,
  subscriptionsPath?: string,
  ): IPubSubClient {
  const {subscriptionsUrl}: IServerInfo = createServerInfo(server, subscriptionsPath)
  const subscriptionClient = new SubscriptionClient(
    subscriptionsUrl,
    {reconnect: true},
    NodeWebSocket,
  )
  const apolloClient = new ApolloClient({
    link: new WebSocketLink(subscriptionClient),
    cache: new InMemoryCache(),
  })
  return {
    subscribe: (options) => apolloClient.subscribe(options),
    mutate: (options) => apolloClient.mutate(options),
    close: () => subscriptionClient.close(),
  }
}

/**
 * Referenced from https://bit.ly/2FLv9Sz
 */
function createServerInfo(
  server: http.Server,
  subscriptionsPath?: string,
): IServerInfo {
  const serverInfo: any = {
    ...server.address() as AddressInfo,
    server,
    subscriptionsPath,
  }

  // Convert IPs which mean "any address" (IPv4 or IPv6) into localhost
  // corresponding loopback ip. Note that the url field we're setting is
  // primarily for consumption by our test suite. If this heuristic is
  // wrong for your use case, explicitly specify a frontend host (in the
  // `frontends.host` field in your engine config, or in the `host`
  // option to ApolloServer.listen).
  let hostForUrl = serverInfo.address
  if(serverInfo.address === '' || serverInfo.address === '::'){
    hostForUrl = 'localhost'
  }

  serverInfo.subscriptionsUrl = format({
    protocol: 'ws',
    hostname: hostForUrl,
    port: serverInfo.port,
    slashes: true,
    pathname: subscriptionsPath,
  })

  return serverInfo
}
```

<br>

#### Subscription.ts 리졸버
```typescript
import {
  Arg,
  Field,
  ID,
  Mutation,
  ObjectType, Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql'

const NOTIFICATIONS = 'notifications'

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: number

  @Field({nullable: true})
  message?: string

  @Field(() => Date)
  date: Date
}

interface INotificationPayload {
  id: number
  message?: string
}

@Resolver()
export default class Subscriptions {
  private _count: number = 0

  @Query((returns) => Date)
  currentDate() {
    return new Date()
  }

  @Mutation(() => (Boolean))
  async setCount(
    @PubSub(NOTIFICATIONS) notify: Publisher<INotificationPayload>,
    @Arg('message', {nullable: true}) message?: string,
  ): Promise<boolean> {
    const payload: INotificationPayload = {id: this._count, message}
    this._count += 1
    await notify(payload)
    return true
  }

  @Subscription({topics: NOTIFICATIONS})
  defaultNotification(@Root() {id, message}: INotificationPayload): Notification {
    return {id, message, date: new Date()}
  }
}
```

<br>

#### 테스트케이스 GraphqlServer.spec.ts
```typescript
// ..생략..
  describe('subscription',  () => {
    before(async () => {
      httpServer = await server.start({
        graphql: {
          typeResolvers: [Subscriptions],
        },
      }) as Server
    })

    after(async () => {
      await server.stop()
    })

    it('should successfully get data from subscription after publishing mutation', async () => {
      let subscriptionValue = ''
      let MESSAGE = 'hello world'

      const subscriptionQuery = gql`
        subscription {
          defaultNotification {
            id
            message
            date
          }
        }
      `
      const mutation = gql`
        mutation{
          setCount(message: "${MESSAGE}")
        }
      `
      const pubSubClient: IPubSubClient = createPubSubClient(
          httpServer,
          server.apollo.subscriptionsPath,
      )

      pubSubClient.subscribe({query: subscriptionQuery}).subscribe({
        next: ({data}) => (subscriptionValue = data.defaultNotification.message),
      })
      await pubSubClient.mutate({
        mutation,
      })

      expect(subscriptionValue).to.equal(MESSAGE)

      pubSubClient.close()
    })
  })
// ..생략..  
```
