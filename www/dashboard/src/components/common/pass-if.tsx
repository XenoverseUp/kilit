/**
 * Use this to pass props conditionally as such:
 * <Element
 *   className=""
 *   ...passIf(condition, { anchor: anchorRef })
 * />
 */

export function passIf(condition: boolean, props = {}) {
  return condition ? props : {}
}
