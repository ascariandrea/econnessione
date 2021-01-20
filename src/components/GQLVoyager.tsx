import { Block } from "baseui/block"
import * as React from "react"
import "graphql-voyager/dist/voyager.css"

async function introspectionProvider(query: any): Promise<any> {
  return await fetch(window.location.origin + "/___graphql", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: query }),
  }).then(async (response) => await response.json())
}

export const GQLVoyager: React.FC = (props) => {
  const [Component, setComponent] = React.useState<React.FC<any> | undefined>(
    undefined
  )
  React.useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    import("graphql-voyager").then((c) => {
      const GQLVoyagerComponent = c.GraphQLVoyager
      setComponent((): React.FC<any> => {
        return GQLVoyagerComponent as any;
      })
    })
  })

  if (typeof window === "undefined") {
    return null
  }

  return Component !== undefined ? (
    <Block
      overrides={{
        Block: { style: { height: "400px", position: "relative" } },
      }}
    >
      <Component introspection={introspectionProvider} hideSettings={true} />
    </Block>
  ) : null
}