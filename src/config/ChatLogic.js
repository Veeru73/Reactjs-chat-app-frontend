export const getSender = (loggedUser, users) => {
  // console.log("logged_user--------",loggedUser,"users--------->",users)
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isSameMessageDate = (messages, m, i) => {
  const getFullDateString = (date) => {
    const dateObject = new Date(date);
    const currentYear = dateObject.getFullYear();
    const currentMonth = dateObject.getMonth() + 1; // Months are zero-based, so add 1
    const currentDay = dateObject.getDate();
    const fullDate = `${currentYear}-${currentMonth}-${currentDay}`;
    return fullDate;
  };

  const currentMessageDate = getFullDateString(m.createdAt);

  if (
    i > 0 &&
    getFullDateString(messages[i - 1].createdAt) === currentMessageDate
  ) {
    return true; // Previous message has the same date
  }

  if (
    i < messages.length - 1 &&
    getFullDateString(messages[i + 1].createdAt) === currentMessageDate
  ) {
    return true; // Next message has the same date
  }

  return false; // No other message with the same date
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
