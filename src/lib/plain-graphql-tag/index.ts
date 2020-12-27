function gql(literals: TemplateStringsArray, ...placeholders: string[]) {
  let result = ''

  for (let i = 0; i < placeholders.length; i++) {
    result += literals[i]
    result += placeholders[i]
  }

  result += literals[literals.length - 1]

  return result
}

export default gql
