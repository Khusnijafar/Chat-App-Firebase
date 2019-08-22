import React, { Component } from 'react'
import MessagesHeader from './MessagesHeader'
import MessagesForm from './MessagesForm'
import firebase from '../../firebase'
import Message from './Message'
import { Segment, Comment, } from 'semantic-ui-react'

export default class Messages extends Component {
    state  = {
        privateChannel: this.props.isPrivateChannel,    
        privateMessagesRef: firebase.database().ref('privateMessages'),
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        messagesLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        numUniqueUsers: ''
    }

    componentDidMount() {
        const { channel, user } = this.state

        if (channel && user) {
            this.addListeners(channel.id)
        }
    }

    addListeners = channelId => {
        this.addMessageListener(channelId)
    }

    addMessageListener = channelId => {
        let loadedMessages = []
        const ref = this.getMessagesRef()
        ref.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val())
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            })
            this.countUniqueUsers(loadedMessages)
        })
    }

    getMessagesRef = () => {
        const { messagesRef, privateMessagesRef, privateChannel } = this.state
        return privateChannel ? privateMessagesRef : messagesRef
    }

    countUniqueUsers = messages => {
        const uniqueUsers = messages.reduce((acc, message) => {
            if(!acc.includes(message.user.name)) {
                acc.push(message.user.name)
            }
            return acc
        }, [])
        const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0
        const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's': ''}`
        this.setState({ numUniqueUsers })
    }

    displayMessages = messages => (
        messages.length > 0 && messages.map(message => (
            <Message 
                key={message.timestamp}
                message={message}
                user={this.state.user}
            />
        ))
    )

    isProgressBarVisible = percent => {
        if (percent > 0) {
            this.setState({ progressBar: true })
        }
    }

    displayChannelName = channel => channel ? `${channel.name}`: ''

    render() {
        const { messagesRef, channel, user, messages, progressBar, numUniqueUsers, privateChannel, isPrivateChannel } = this.state
        return (
            <React.Fragment>
                <MessagesHeader 
                    channelName={this.displayChannelName(channel)}
                    numUniqueUsers={numUniqueUsers}
                    privateChannel={privateChannel}
                    isPrivateChannel={isPrivateChannel}
                />
                    
                <Segment>
                    <Comment.Group className={progressBar ? 'messages__progress': 'messages'}>
                        {this.displayMessages(messages)}
                    </Comment.Group>
                </Segment>

                  <MessagesForm 
                    messagesRef={messagesRef}
                    currentChannel={channel}
                    currentUser={user}
                    isPrivateChannel={isPrivateChannel}
                    getMessagesRef={this.getMessagesRef}
                  />
            </React.Fragment>
        )
    }
}
