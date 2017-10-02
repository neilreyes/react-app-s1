import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './ToDoItem';

class Todos extends Component {
	render() {
		let todosItems;

		if( this.props.todos ){
			todosItems = this.props.todos.map( todo => {
				return (
					<TodoItem
						key={todo.title}
						todo={todo}
					/>
				);
			});
		}

	   return (
	      <div className="Todos">
	        <ul>
	        	{todosItems}
	        </ul>
	      </div>
	   );
	}
}

Todos.propTypes = {
	todos: PropTypes.array,
}

export default Todos;
