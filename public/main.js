$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function (data) {
            const { results } = data;
            results.map(person => {
                return $('.people-list').html(`<li class="list-group-item" id="${person._id}">${person.name} | <button class="edit">Edit</button> | <button class="del">X</button></li>`);
            })

            $('.edit').click(e => {
                e.preventDefault();
                console.log('clicked');
            })
        }
    });

});