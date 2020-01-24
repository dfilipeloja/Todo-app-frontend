import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from './PageHeader'
import TodoForm from './TodoForm'
import TodoList from './TodoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {

    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/i` : ''
        axios.get(`${URL}?sort=-createdAt${search}`).then(res => this.setState({ ...this.state, description, list: res.data }))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleClear() {
        this.refresh()
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description }).then(res => this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`).then(res => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true}).then(res => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false}).then(res => this.refresh(this.state.description))
    }

    render() {
        return (
            <div>
                <PageHeader name='Todo' small='Add' />
                <TodoForm 
                    description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <TodoList 
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending} />
            </div>
        )
    }
}