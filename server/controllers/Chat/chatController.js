const mongoose = require("mongoose");
const AppError = require("./../../utils/appError");
const catchAsync = require("./../../utils/catchAsync");
const Chat = require("./../../models/Chat/chatModel");
const User = require("./../../models/userModel");
const Message = require("../../models/Chat/messageModel");

exports.acessChat = catchAsync(async (req, res) => {
  const { userId } = req.body;
  // console.log(userId);
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  // console.log(isChat);
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      // return next(new AppError("Invalid email or password", 401));
      return next(new AppError(error.message, 401));
    }
  }
});

exports.fetchChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      isGroupChat: false,
      users: { $elemMatch: { $eq: req.user._id } },
    }).populate("users", "-password");
    res.send(chat);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error,
    });
  }
};

exports.createGroupChat = catchAsync(async (req, res) => {
  try {
    var users = [];
    users.push(req.user._id);
    const groupChat = await Chat.create({
      chatName: req.body.chatName,
      users: users,
      isGroupChat: true,
      groupCreater: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id });
    // .populate("users", "-password")
    // .populate("groupCreater");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error,
    });
  }
});

exports.getAllDiscussion = catchAsync(async (req, res, next) => {
  try {
    const message = await Chat.find({ isGroupChat: true })
      .populate("groupCreater", "name photo")
      .populate("users", "name photo");

    res.json(message);
  } catch (error) {
    console.log(error);
    // res.status(400);
    // throw new Error(err.message);
    return next(new AppError(error.message, 400));
  }
});

exports.doVotes = catchAsync(async (req, res, next) => {
  const chatId = req.params.id;
  const userId = req.user._id;
  const vote = req.body.vote;
  if (vote === "up") {
    const isPresent = await Chat.find({
      chatId,
      isGroupChat: true,
      $and: [{ upvotes: { $elemMatch: { $eq: req.user._id } } }],
    });

    const isDisLiked = await Chat.find({
      chatId,
      isGroupChat: true,
      $and: [{ upvotes: { $elemMatch: { $eq: req.user._id } } }],
    });

    if (isDisLiked.length > 0) {
      await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { downvotes: userId },
        },
        {
          new: true,
        }
      );
    }

    console.log(isPresent);
    if (isPresent.length > 0) {
      try {
        await Chat.findByIdAndUpdate(
          chatId,
          {
            $pull: { upvotes: userId },
          },
          {
            new: true,
          }
        );
      } catch (err) {
        res.status(401).json({ error: err });
      }
    } else {
      await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { upvotes: userId },
        },
        {
          new: true,
        }
      );
    }
    const voteup = await Chat.findById(chatId).populate(
      "upvotes",
      "name photo"
    );
    // console.log(voteup);
    res.status(201).json({
      status: "success",
      upvotes: voteup.upvotes.length,
      users: voteup.upvotes,
    });
  } else {
    const isPresent = await Chat.find({
      chatId,
      isGroupChat: true,
      $and: [{ downvotes: { $elemMatch: { $eq: req.user._id } } }],
    });

    const isLiked = await Chat.find({
      chatId,
      isGroupChat: true,
      $and: [{ upvotes: { $elemMatch: { $eq: req.user._id } } }],
    });
    console.log(isLiked);
    if (isLiked.length > 0) {
      await Chat.findByIdAndUpdate(
        chatId,
        {
          $pull: { upvotes: userId },
        },
        {
          new: true,
        }
      );
    }

    // console.log(isPresent);
    if (isPresent.length > 0) {
      try {
        await Chat.findByIdAndUpdate(
          chatId,
          {
            $pull: { downvotes: userId },
          },
          {
            new: true,
          }
        );
      } catch (err) {
        res.status(401).json({ error: err });
      }
    } else {
      await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { downvotes: userId },
        },
        {
          new: true,
        }
      );
    }

    const votesdown = await await Chat.findById(chatId).populate(
      "downvotes",
      "name photo"
    );
    res.status(201).json({
      status: "success",
      downvotes: votesdown.downvotes.length,
      users: votesdown.downvotes,
    });
  }
});

exports.deleteDiscussion = catchAsync(async (req, res, next) => {
  const chatId = req.body.chatId;
  await Chat.findByIdAndDelete(chatId);

  const chatMessage = Message.deleteMany({ chat: chatId });
  console.log(chatMessage);
  res.status(201).json({
    status: "success",
  });
});
