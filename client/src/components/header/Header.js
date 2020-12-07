import Login from "../login/login"
import Register from "../register/register"
import "./header.css"

function Header(props) {

    const role = 1
    const name = "charly"
    let login
    if(role < 1){
        login = "guest"
    } else {
        login = "charly"
    }
    
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Add Post</a>
                    </li>
                    
                </ul>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {login}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                    <div class="btn-group-vertical" id="btn-group-header" role="group" aria-label="Basic example">
                        <Login />
                        <Register />
                    </div>
                    </div>
                </div>
            </div>
        </nav>
    );
  }
  
  export default Header;