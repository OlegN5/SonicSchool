// $(document).ready(function(){
    // console.log('READY!!!')
    // var csrfToken = $("input[name=csrfmiddlewaretoken]").val()
    // path = $("#player").children().attr('src')
    // wav1 = path.split('/')
    // wav1 = wav1[wav1.length - 1]
    // wav1 = wav1.split('.')
    // wav1 = wav1[0]
    // console.log('wav1', wav1, path)
    // if (sessionStorage.getItem('fileName')) {
    //     sessionStorage.removeItem('fileName')
    // }
    
   
    // $("#message").click(function(){
    //     if (sessionStorage.getItem('fileName')) {
    //         fileName = sessionStorage.getItem('fileName')
    //     }else {
    //         fileName = 'test'
    //     }

        

        

    //     $.ajax({
    //         url: '/repeater/message2u/',
    //         data: {csrfmiddlewaretoken: csrfToken, 
    //             'wav': wav1,
    //             'fileName': fileName
    //         },
    //         type: 'post',
    //         dataType: 'json',
    //         success: function(response) {
    //             alert(response.message_2u);
    //             // $("#mess").append('<div>' + response.message_2u + '</div>')
    //         }
    //     })
    // })

// });







    // $("#createButton").click(function(){
    //     var serializedData = $('#createTaskForm').serialize();
    //     // console.log(serializedData)

    //     $.ajax({
    //         url: $("#createForm").data('url'),
    //         data: serializedData,
    //         type: 'post',
    //         success: function(response) {
    //             $("#taskList").append('<div class="card mb-1" id="taskCard" data-id="' + response.task.id + '"><div class="card-body">' + response.task.title + '<button type="button" class="btn-close float-right" data-id="' + response.task.id + '"></button></div></div>')
    //         }
    //     })
    //     $("#createTaskForm")[0].reset()
    // })

    // $(("#taskList")).on('click', '.card', function(){
    //     var dataId = $(this).data('id')

    //     $.ajax({
    //         url: '/tasks/' + dataId + '/completed/',
    //         data: {
    //             csrfmiddlewaretoken: csrfToken,
    //             id: dataId
    //         },
    //         type: 'post',
    //         success: function() {
    //              var cardItem = $('#taskCard[data-id="' + dataId + '"]')
    //              cardItem.css('text-decoration', 'line-through').hide().slideDown()
    //              $("#taskList").append(cardItem)
    //         }

    //     })
    // }).on('click', 'button.btn-close', function(event) {
    //     event.stopPropagation()

    //     var dataId = $(this).data('id')

    //     $.ajax({
    //         url: '/tasks/' + dataId + '/delete/',
    //         data: {
    //             csrfmiddlewaretoken: csrfToken,
    //             id: dataId
    //         },
    //         type: 'post',
    //         dataType: 'json', 
    //         success: function() {
    //             $('#taskCard[data-id="' + dataId + '"]').remove()
    //         }
    //     })


   
