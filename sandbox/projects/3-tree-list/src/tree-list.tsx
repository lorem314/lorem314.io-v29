import {
  createRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  type MouseEvent,
} from "react"

import type { ItemType } from "./data"
import { Details } from "./details"
import { ChevronDown, ChevronRight, CollapseAll, ExpandAll } from "./icons"

export function TreeList({
  data,
}: {
  data: { title: string; items?: ItemType[] }
}) {
  const refDetails = useRef<{ open: () => void; close: () => void }>(null)
  const refItems = useRef<{ openAll: () => void; closeAll: () => void }>(null)

  const openAll = () => {
    refDetails.current?.open()
    refItems.current?.openAll()
  }
  const closeAll = () => {
    refDetails.current?.close()
    refItems.current?.closeAll()
  }

  return (
    <div>
      <Details open={true} ref={refDetails}>
        <div className="details-head">
          <div style={{ marginRight: "auto" }}>{data.title}</div>
          <ExpandAll
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              openAll()
            }}
          />
          <CollapseAll
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              closeAll()
            }}
          />
        </div>
        {data.items ? <Items items={data.items} ref={refItems} /> : null}
      </Details>
    </div>
  )
}

const Items = forwardRef(({ items }: { items: ItemType[] }, ref) => {
  const refs = useRef(
    items.map(() => {
      return createRef<{ openAll: () => void; closeAll: () => void }>()
    }),
  )

  useImperativeHandle(
    ref,
    () => ({
      openAll: () => {
        refs.current.forEach((ref) => ref.current?.openAll())
      },
      closeAll: () => {
        refs.current.forEach((ref) => ref.current?.closeAll())
      },
    }),
    [],
  )

  return (
    <ul className="tree-list">
      {items.map((item, index) => {
        return (
          <li key={index}>
            <Item ref={refs.current[index]} item={item} />
          </li>
        )
      })}
    </ul>
  )
})

const Item = forwardRef(({ item }: { item: ItemType }, ref) => {
  const refDetails = useRef<{ open: () => void; close: () => void }>(null)
  const refItems = useRef<{ openAll: () => void; closeAll: () => void }>(null)

  const openAll = () => {
    refDetails.current?.open()
    refItems.current?.openAll()
  }
  const closeAll = () => {
    refDetails.current?.close()
    refItems.current?.closeAll()
  }

  useImperativeHandle(ref, () => ({ openAll, closeAll }), [])

  if (!item.items) {
    return <span>{item.title}</span>
  }

  return (
    <Details open={true} ref={refDetails}>
      <div className="details-head">
        <div style={{ marginRight: "auto" }}>{item.title}</div>
        <ExpandAll
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            openAll()
          }}
        />
        <CollapseAll
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            closeAll()
          }}
        />
      </div>
      <Items items={item.items} ref={refItems} />
    </Details>
  )
})
