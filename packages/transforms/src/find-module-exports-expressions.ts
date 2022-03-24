import j from 'jscodeshift'

import type { Program } from './types'

export function findModuleExportsExpressions(program: Program) {
  program.find(j.AssignmentExpression).filter((path) => {
    const { left, right } = path.value

    return (
      left.type === 'MemberExpression' &&
      left.object.type === 'Identifier' &&
      left.property.type === 'Identifier' &&
      left.property.name === 'exports' &&
      right.type === 'ObjectExpression'
    )
  })
}
