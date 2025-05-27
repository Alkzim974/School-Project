export const user_info = `
{
  user {
    firstName
    lastName
    login
    totalUp
    totalDown
    auditRatio
    attrs
  }
}`

export const ratio_info = `
{
  user {
    auditRatio
    totalUp
    totalDown
  }
}`

export const level_info = `
{
  user {
    events(where: {eventId: {_eq:303}}) {
      level
    } 
  }
}`

export const skills_info = `
{
  user {
    skillTechnologies: transactions(where: {type: {_in: ["skill_go", "skill_docker", "skill_js", "skill_html", "skill_css", "skill_sql", "skill_unix", "skill_prog", "skill_back-end", "skill_front-end", "skill_git"]}}) {
      type
      amount
      createdAt
    }
    skillTechnical: transactions(where: {_and: [{type: {_like: "skill%"}}, {type: {_nin: ["skill_go", "skill_docker", "skill_js", "skill_html", "skill_css", "skill_sql", "skill_unix", "skill_prog", "skill_back-end", "skill_front-end", "skill_git"]}}]}) {
      type
      amount
      createdAt
    }
  }
}`

export const top_project = `
{
  user {
    transactions(
      limit: 10
      where: {type: {_eq: "xp"}}
      order_by: {amount: desc}
    ) {
      object {
        name
        id
        type
      }
      amount
      createdAt
      path
      event {
        id
        object {
          name
        }
      }
    }
  }
}`

export const transaction_info = `
{
  transaction(
    where: {type: {_eq: "xp"}}
    order_by: {createdAt: asc}
    limit: 30
  ) {
    amount
    object {
      name
      id
      type
    }
    createdAt
    path
    event {
      id
      object {
        name
      }
    }
  }
}`

export const current_audits = `
{
  progress(
    where: {isDone: {_eq: false}}
  ) {
    id
    object {
      name
      type
    }
    createdAt
    updatedAt
  }
}`

export const xp_progression = `
{
  transaction(
    where: {
      type: {_eq: "xp"}
    }
    order_by: {createdAt: asc}
  ) {
    amount
    createdAt
    object {
      name
    }
  }
}`

export const piscine_info = `
{
  event(
    where: {object: {name: {_like: "%Piscine%"}}}
    order_by: {beginAt: desc}
  ) {
    id
    object {
      name
    }
    beginAt
    endAt
  }
}`