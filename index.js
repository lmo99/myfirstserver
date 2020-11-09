const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const myProfile = {
    firstName:"Lotanna",
    lastName: "Okaro",
    favouriteColour:"pink",
    favouriteFood:"jollof"
};

const facts = [
    "I am 21 years old",
    "I graduated in 2020, but with no celebration due to corona",
    "I lived in San Diego for the second half of last year",
    "I've gotten through a ridiculous amount of Real Housewives since lockdown",
    "I had 0 experience of coding before I started this bootcamp",
]

const richardsProfile = {
    firstName:"Richard",
    lastName: "Ng",
    favouriteColour:"blue",
    favouriteFood:"huel"
};

const bcodhersProfile = {
    firstName:"Black",
    lastName: "Codher",
    favouriteColour:"black",
    favouriteFood:"pasta"
};

const janesProfile = {
    firstName:"Jane",
    lastName: "Doe",
    favouriteColour:"yellow",
    favouriteFood:"fruit"
};

const db = {
    profiles: {
        1000: myProfile,
        1001: richardsProfile,
        1002: bcodhersProfile,
        1003: janesProfile
    },
    albums: {
        0:{
            title: "Trilogy",
            favouriteSong: "The Party and The Afterparty",
        },
        1:{
            title: "Oxymoron",
            favouriteSong: "Blind Threats",
        },
        2:{
            title: "The College Dropout",
            favouriteSong: "Spaceship",
        },
        3:{
            title: "Ctrl",
            favouriteSong: "Garden",
        }
    }
}


app.get('/', (req, res) => {
    res.json({message: "Local server is working!"})
})

//request, response
app.get('/aboutme', (req, res) => {
    const randomIndex = Math.floor(Math.random() * facts.length)
    const randomFact = facts[randomIndex]
    res.json({
        ...myProfile,
        fact: randomFact
    })
    
})

app.get('/profiles', (req, res) => {
    res.status(200).json({
      status: 'success',
      data: db.profiles
    })
  })

  app.get('/profiles/:userId', (req, res) => {
    console.log(req.params.userId)
  
    const matchingProfile = db.profiles[req.params.userId]
  
    if (matchingProfile) {
      res.json({
        status: 'success',
        data: matchingProfile
      })
    } else {
      res.status(404).json({
        message: "Couldn't find user with that id"
      })
    }
    
  })
  
  
  app.post('/profiles', (req, res) => {
    const existingIds = Object.keys(db.profiles)
    const largestKey = Math.max(...existingIds)
  
    const newKey = largestKey + 1
  
    db.profiles[newKey] = req.body
  
    res.status(201).json({
      status: 'success',
      message: `Created a profile with id of ${newKey}`
    })
  })

  
  app.put('/profiles/:userId', (req, res) => {
    const idToUpdate = req.params.userId
  
    db.profiles[idToUpdate] = req.body
  
  
    res.status(200).json({
      message: "User updated"
    })
  })
  

  app.patch('/profiles/:userId', (req, res) => {
  
    db.profiles[req.params.userId] = {
      ...db.profiles[req.params.userId],
      ...req.body
    }
  
    res.status(200).json({
      message: "User updated"
    })
  })


 app.delete('/profiles/:userId', (req, res) => {
  
    delete db.profiles[req.params.userId]
  
    res.status(200).json({
      status: 'success',
      message: 'deleted profile 1003'
    })
  })

  //ALBUMS
  app.get('/albums', (req, res) => {
    res.status(200).json({
      status: 'success',
      data: db.albums,
    })
  })

  app.get('/albums/:albumsId', (req, res) => {
    console.log(req.params.albumsId)
  
    const matchingAlbum = db.albums[req.params.albumsId]
  
    if (matchingAlbum) {
      res.json({
        status: 'success',
        data: matchingAlbum,
      })
    } else {
      res.status(404).json({
        message: "Couldn't find albums with that id"
      })
    }
    
  })
  
  
  app.post('/albums', (req, res) => {
    const existingIds = Object.keys(db.albums)
    const largestKey = Math.max(...existingIds)
  
    const newKey = largestKey + 1
  
    db.albums[newKey] = req.body
  
    res.status(201).json({
      status: 'success',
      message: `Created an album with id of ${newKey}`
    })
  })

  
  app.put('/albums/:userId', (req, res) => {
    const idToUpdate = req.params.userId
  
    db.albums[idToUpdate] = req.body
  
  
    res.status(202).json({
      message: "Album updated"
    })
  })
  

  app.patch('/albums/:userId', (req, res) => {
  
    db.albums[req.params.userId] = {
      ...db.albums[req.params.userId],
      ...req.body
    }
  
    res.status(203).json({
      message: "User updated"
    })
  })


 app.delete('/albums/:userId', (req, res) => {
  
    delete db.albums[req.params.userId]
  
    res.status(204).json({
      status: 'success',
      message: 'deleted album 3'
    })
  })
  

app.listen(4000, () => {
    console.log("Let's go!")
})

