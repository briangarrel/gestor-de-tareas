(function() {
    const input         = document.querySelector('#itnew');
    const form          = document.querySelector('#formitnew');
    const selectList    = document.querySelector('#slist');
    const listContainer = document.querySelector('#lists')

    let todos = [];
    let lists = [
        {id: newKey(), text: 'General', count: 0},
        {id: newKey(), text: 'Casa', count: 0},
        {id: newKey(), text: 'Trabajo', count: 0}
    ];

    function todo(id, text, list, completed){
        return {id: id, text: text, list: list, completed: completed};
    }

    function renderTodos(){
        const todosContainer = document.querySelector('#todos');
        todosContainer.innerHTML = '';

        todos.forEach( todo => {
            todosContainer.innerHTML += renderTodo(todo);
        });

        document.querySelectorAll('.todo label input').forEach(item => {
            item.addEventListener('click', e => {
                const id = e.target.parentNode.parentNode.getAttribute('data-id');
                console.log(id);
                const index = todos.findIndex(todo => todo.id === id);

                todos[index].completed = !todos[index].completed;
            });
        });

        document.querySelectorAll('.todo button').forEach(item => {
            item.addEventListener('click', e => {
                const id = e.target.parentNode.getAttribute('data-id');
                const obj = getItemAndIndex(todos, {id: id});

                todos.splice(obj.index, 1);

                renderLists();
                renderTodos();
            })
        })
    }

    function getItemAndIndex(arr, obj){
        let i = 0;
        const key = Object.keys(obj);
        const value = obj[key];

        for(i = 0; i < arr.length; i++){
            if(arr[i][key] === value){
                return {index: i, item: arr[i]};
            }
        }
    }

    function renderLists(){
        lists.forEach(list => {
            list.count = 0;
        });

        todos.forEach(todo => {
            lists.forEach(list => {
                if (todo.list === list.id){
                    list.count++;
                }
            });
        });

        listContainer.innerHTML = '';
        lists.forEach(list => {
            listContainer.innerHTML += renderListItem(list);
        })
    }

    function renderListItem(list){
        return `
            <div class='list'>
                <h3>${list.text}</h3>
                <span>${list.count} tareas</span>
            </div>
        `;
    }

    function renderTodo(todo){
        return `
            <div class='todo' data-id='${todo.id}'>
                <label class='checkbox-container'>${todo.text}
                    <input type='checkbox' ${(todo.completed) ? 'checked="checked"' : ''}/>
                    <span class='checkmark'></span>
                </label>
                <button></button>
            </div>
        `;
    }

    function refreshUI(){
        renderTodos();
        renderLists();
    }

    document.addEventListener('DOMContentLoaded', e =>{
        refreshUI();
        lists.forEach( list => {
            selectList.innerHTML += `<option value='${list.id}'>${list.text}</option>`;
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const text = input.value.trim();
        const listId = selectList.value;

        if (text === '') return false;

        const newTodo = new todo(newKey(), text, listId, false);
        todos.push(newTodo);
        input.value = '';

        refreshUI();
    });

    function newKey() {
        var newKey = Math.random();
        return newKey.toString();
      }

})();