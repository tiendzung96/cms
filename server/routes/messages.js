var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');

function returnError(res, error){
  res
    .status(500)
    .json({
      message: 'An error occured',
      error: error
    })
}

router.get('/', (req, res, next) =>{
  Message.find()
    .populate('sender')
    .then(messages => {
      res
        .status(200)
        .json({
          message: 'Messages fetched successfully!',
          messages: messages
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.get('/:id', (req, res, next) =>{
  Message.findOne({
    "id": req.params.id
  })
    .populate('sender')
    .then(message => {
      res
        .status(200)
        .json({
          message: 'Message fetched successfully!',
          messages: message
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.post('/', (req, res, next)=>{
  const maxMessageId = sequenceGenerator.nextId("messages");
  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  message.save()
    .then(createdMessage => {
      res
        .status(201)
        .json({
          message: 'Message added successfully',
          messages: createdMessage
        });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Message.findOne({
    id: req.params.id
  })
  .populate('sender')
  .then(message => {
    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    Message.updateOne({
      id: req.params.id
    }, contact)
    .then(result => {
      res
        .status(204)
        .json({
          message: 'Message updated successfully'
        })
    })
    .catch(error => {
      returnError(res, error);
    });

  })
  .catch(error => {
    res.status(500).json({
      message: 'Message not found.',
      error: {
        message: 'Message not found'
      }
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({
    id: req.params.id
  })
  .populate('sender')
  .then(message => {
    Message.deleteOne({
      id: req.params.id
    })
    .then(result => {
      res
        .status(204)
        .json({
          message: "Message deleted successfully"
        });
    })
    .catch(error => {
      returnError(res, error);
    })
  })
  .catch(error => {
    returnError(res, error);
  });
});

module.exports = router;
