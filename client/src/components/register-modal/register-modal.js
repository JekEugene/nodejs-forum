import React from 'react'

function RegisterModal(props){
    return(
        <div class="modal" id="register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="/register" method="POST">
                            <div class="form-group">
                                <label for="name">name</label>
                                <input type="text" class="form-control" id="name" placeholder="name" />
                            </div>
                            <div class="form-group">
                                <label for="email">email</label>
                                <input type="email" class="form-control" id="email" placeholder="user@gmail.com" />
                            </div>
                            <div class="form-group">
                                <label for="password">password</label>
                                <input type="passworf" class="form-control" id="password" placeholder="password" />
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary">register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterModal