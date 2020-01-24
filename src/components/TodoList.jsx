import React from 'react'
import IconButton from './IconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []

        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' hidden={todo.done} onClick={() => props.handleMarkAsDone(todo)} />
                    <IconButton style='warning' icon='undo' hidden={!todo.done} onClick={() => props.handleMarkAsPending(todo)} />
                    <IconButton style='danger' icon='trash-o' hidden={!todo.done} onClick={() => props.handleRemove(todo)} />
                </td>
            </tr>
        ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Description</th>
                    <th className='tableActions'>Action</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}