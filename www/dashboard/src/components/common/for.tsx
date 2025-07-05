import type { ClassValue } from 'clsx'
import type { ElementType, ReactNode } from 'react'
import { Fragment } from 'react'

interface BaseProps {
  element?: ElementType
  className?: ClassValue
}

interface TimesProps extends BaseProps {
  renderItem: (index: number, till: number) => ReactNode
  times: number
}

interface EachProps<T> extends BaseProps {
  renderItem: (item: T, index: number, array: Array<T>) => ReactNode
  each: Array<T>
}

function For(props: TimesProps): Array<ReactNode> | ReactNode
function For<T>(props: EachProps<T>): Array<ReactNode> | ReactNode

function For<T>({
  element: Element = Fragment,
  className,
  ...props
}: TimesProps | EachProps<T>) {
  if ('times' in props) {
    return Element === Fragment ? (
      <>
        {Array.from({ length: props.times }).map((_, index) =>
          props.renderItem(index, props.times),
        )}
      </>
    ) : (
      <Element className={className}>
        {Array.from({ length: props.times }).map((_, index) =>
          props.renderItem(index, props.times),
        )}
      </Element>
    )
  }

  return Element === Fragment ? (
    <>
      {props.each.map((item, index) =>
        props.renderItem(item, index, props.each),
      )}
    </>
  ) : (
    <Element className={className}>
      {props.each.map((item, index) =>
        props.renderItem(item, index, props.each),
      )}
    </Element>
  )
}

export default For
