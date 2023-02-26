const catchAsync = require("./../../utils/catchAsync");
const Message = require("./../../models/Chat/messageModel");
const User = require("./../../models/userModel");
const Chat = require("./../../models/Chat/chatModel");
const AppError = require("../../utils/appError");

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  // var isChat = await Chat.find({
  //   isGroupChat: false,
  //   $and: [
  //     { users: { $elemMatch: { $eq: req.user._id } } },
  //     { users: { $elemMatch: { $eq: userId } } },
  //   ],
  // });

  const isUserExist = await Chat.find({
    chat: chatId,
    isGroupChat: true,
    // _id: chatId,
    $and: [{ users: { $elemMatch: { $eq: req.user._id } } }],
  });
  // console.log("-------------user Exist--------------");
  // console.log(isUserExist);

  if (isUserExist.length < 1) {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: req.user._id },
      },
      {
        new: true,
      }
    );
    // console.log("----------added------------");
    // console.log(added);
    if (!added) {
      // res.status(404);
      return next(new AppError("Chat Not Found", 404));
    }
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "sender",
      select: "name photo email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.status(201).json(message);
  } catch (err) {
    console.log(err);
    // res.status(400);
    return next(new AppError(err.message, 400));
    //  new Error(err.message);
  }
});

exports.getAllMessage = catchAsync(async (req, res, next) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(message);
  } catch (error) {
    console.log(error);
    // res.status(400);
    // throw new Error(err.message);
    return next(new AppError(error.message, 400));
  }
});
