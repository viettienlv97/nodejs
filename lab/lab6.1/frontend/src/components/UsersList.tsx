import { Component } from 'react'

interface Props {
  list: Array<string>
}

class UsersList extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.list.map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default UsersList
