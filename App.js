useEffect(()=>{
    axios
    .get('https://stark-shelf-08940.herokuapp.com/groceries')
    .then((response)=>{
      setGroceries(response.data);
    })
  }, [])
  const handleCreateUser = (event) => {
   event.preventDefault()
   setUsername('')
   setPassword('')
   axios.post('https://stark-shelf-08940.herokuapp.com/users/createaccount',
   {
     username: username,
     password: password
   })
   .then((response) => {
     if(response.data.username){
       setToggleError(false)
       setErrorMessage('')
       setCurrentUser(response.data)
       handleToggleLogout()
     } else {
       setErrorMessage(response.data)
       setToggleError(true)
     }
   })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    axios.put('https://stark-shelf-08940.herokuapp.com/users/login',
    {
      username: username,
      password: password
    })
    .then((response) => {
      console.log(response.data.username);

      if(response.data.username){
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        handleToggleLogout()
      } else {
        setToggleError(true)
        setErrorMessage(response.data)
      }
    }).then(() => {
      axios.get(`https://stark-shelf-08940.herokuapp.com/users/findOne/${username}`,
    ).then((res) => {
      setCurrentUser(res.data)
    })
    })
  }
  const handleLogout = () => {
  setUsername('')
  setPassword('')
  setCurrentUser({})
  handleToggleLogout()
  }

  const handleToggleForm = (event) => {
    setToggleError(false)
    if(toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogin(true)
    }
  }

  const handleToggleLogout = () => {
    if(toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }


  const handleDelete = (groceryData)=>{
    axios
    .delete(`https://stark-shelf-08940.herokuapp.com/groceries/${groceryData._id}`)
      .then(()=>{
        axios
        .get('https://stark-shelf-08940.herokuapp.com/groceries/')
        .then((response)=>{
          setGroceries(response.data)
        })
      })
    }

