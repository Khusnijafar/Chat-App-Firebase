import React, { Component } from 'react'
import { Segment, Header, Icon, } from 'semantic-ui-react'

export default class MessagesHeader extends Component {
    render() {
        const { channelName, numUniqueUsers, isPrivateChannel } = this.props

        return (
            <Segment clearing>
                <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
                    <span>  
                    {channelName}
                    {!isPrivateChannel && <Icon name={'users'} color='black'/>}
                    </span>
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>
            </Segment>
        )
    }
}
