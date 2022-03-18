/* eslint-disable no-param-reassign */
export default class Field {
  init() {
    this.renderField();
    this.openForms();
  }

  renderField() {
    this.field = document.createElement('div');
    this.field.classList.add('field');
    const header = document.createElement('div');
    header.classList.add('header');
    const addBtn = document.createElement('button');
    addBtn.classList.add('add-button');
    addBtn.classList.add('btn');
    addBtn.innerText = 'Добавить тикет';
    header.appendChild(addBtn);
    const ticketList = document.createElement('ul');
    ticketList.classList.add('ticket-list');
    this.field.appendChild(header);
    this.field.appendChild(ticketList);
    document.querySelector('body').appendChild(this.field);
    this.addForm = document.createElement('form');
    this.addForm.classList.add('add-form');
    this.addForm.classList.add('modal');
    this.addForm.innerHTML = '<div class = \'form-header-wrapper\'> <h3 class = \'form-header\'> Добавить тикет </h3></div>';
    this.addForm.innerHTML += '<div class = \'input-wrapper\'> <h4 class = \'input-header\'> Краткое описание </h4> <input class = \'form-input\' id = \'short-desc\'>  </div>';
    this.addForm.innerHTML += '<div class = \'input-wrapper\'> <h4 class = \'input-header\'> Полное описание </h4> <textarea id = \'full-desc\'> </textarea></div>';
    this.addForm.innerHTML += '<div class = \'btn-group\'> <button class = \'btn cancel-button\'> Отмена </button> <button class = \'btn ok-button\'> OK </button></div>';
    this.addForm.querySelector('.cancel-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.target.closest('.modal').remove();
    });
    this.addForm.querySelector('.ok-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.addNewTicket();
      evt.target.closest('.modal').remove();
    });
  }

  showAddForm() {
    document.querySelector('.field').appendChild(this.addForm);
  }

  showRemoveForm(ticket) {
    this.removeForm = document.createElement('div');
    this.removeForm.classList.add('remove-form');
    this.removeForm.classList.add('modal');
    this.removeForm.innerHTML = '<div class = \'form-header-wrapper\'> <h3 class = \'form-header\'> Удалить тикет </h3></div>';
    this.removeForm.innerHTML += '<div class = \'remove-form-wrapper\'> Вы действительно хотите удалить тикет? Это действие необратимо. </div>';
    this.removeForm.innerHTML += '<div class = \'btn-group\'> <button class = \'btn cancel-button\'> Отмена </button> <button class = \'btn ok-button\'> OK </button></div>';
    document.querySelector('.field').appendChild(this.removeForm);
    this.removeForm.querySelector('.ok-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      ticket.remove();
      this.removeForm.remove();
    });
    this.removeForm.querySelector('.cancel-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.removeForm.remove();
    });
  }

  showEditForm(ticket) {
    this.editForm = document.createElement('form');
    this.editForm.classList.add('edit-form');
    this.editForm.classList.add('modal');
    this.editForm.innerHTML = '<div class = \'form-header-wrapper\'> <h3 class = \'form-header\'> Изменить тикет </h3></div>';
    this.editForm.innerHTML += `<div class = 'input-wrapper'> <h4 class = 'input-header'> Краткое описание </h4> <input class = 'form-input' id = 'short-desc' value = ${ticket.querySelector('.ticket-short-desc').innerText}></div>`;
    this.editForm.innerHTML += `<div class = 'input-wrapper'> <h4 class = 'input-header'> Полное описание </h4> <textarea id = 'full-desc' > ${ticket.querySelector('.ticket-full-desc').innerText} </textarea></div>`;
    this.editForm.innerHTML += '<div class = \'btn-group\'> <button class = \'btn cancel-button\'> Отмена </button> <button class = \'btn ok-button\'> OK </button></div>';

    document.querySelector('.field').appendChild(this.editForm);
    this.editForm.querySelector('.ok-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      ticket.querySelector('.ticket-short-desc').innerText = document.getElementById('short-desc').value;
      ticket.querySelector('.ticket-full-desc').innerText = document.getElementById('full-desc').innerText;
      this.editForm.remove();
    });
    this.editForm.querySelector('.cancel-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.editForm.remove();
    });
  }

  createTicket(shortDesc, fullDesc) {
    const ticket = document.createElement('li');
    ticket.classList.add('ticket');
    const date = new Date();
    const createDate = `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    ticket.innerHTML = `<div class = 'ticket-header'> <div class = 'ticket-status'></div> <div class = 'ticket-short-desc'> ${shortDesc}</div><div class = 'ticket-time'> ${createDate} </div> <div class = 'edit-ticket'> </div> <div class ='remove-ticket'> </div> </div> <div class = 'ticket-full-desc'> ${fullDesc} </div>`;
    ticket.querySelector('.ticket-status').addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('ready')) {
        evt.target.classList.add('ready');
      } else {
        evt.target.classList.remove('ready');
      }
    });
    ticket.querySelector('.ticket-short-desc').addEventListener('click', (evt) => {
      if (evt.target.closest('.ticket').querySelector('.ticket-full-desc').classList.contains('visible') === false) {
        evt.target.closest('.ticket').querySelector('.ticket-full-desc').classList.add('visible');
      } else evt.target.closest('.ticket').querySelector('.ticket-full-desc').classList.remove('visible');
    });

    ticket.querySelector('.remove-ticket').addEventListener('click', () => {
      this.showRemoveForm(ticket);
    });

    ticket.querySelector('.edit-ticket').addEventListener('click', () => {
      this.showEditForm(ticket);
    });
    return ticket;
  }

  openForms() {
    document.querySelector('.add-button').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.showAddForm();
    });
  }

  addNewTicket() {
    const shortDesc = document.getElementById('short-desc').value;
    const fullDesc = document.getElementById('full-desc').value;
    if (!shortDesc || !fullDesc) {
      return false;
    }
    const ticket = this.createTicket(shortDesc, fullDesc);
    document.querySelector('.ticket-list').appendChild(ticket);

    return false;
  }
}
