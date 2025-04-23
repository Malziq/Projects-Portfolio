//
// Created by Mazen Alziq on 10/25/24.
//

#include "post.h"
#include <iostream>

/* Implementation for Post class*/
Post::Post() {}
Post::Post(int messageId, int ownerId, std::string message, int likes) {
    messageId_ = messageId;
    ownerId_ = ownerId;
    message_ = message;
    likes_ = likes;
}

int Post::getMessageId() {
    return messageId_;
}

int Post::getOwnerId() { return ownerId_; }
int Post::getLikes() { return likes_; }
std::string Post::getMessage() {return message_;}
std::string Post::getAuthor() {return "";}
bool Post::getIsPublic() {return true;}


std::string Post::postType() {
    std::string line = "";
    return line;
}

std::string Post::toString() {
    std::stringstream ss;
    ss << getMessage() << " Liked by " << getLikes() << " people.";
    std::string output = ss.str();

    return output;
}

bool Post::operator<(Post* right) {
    return getMessageId() < right->getMessageId();
}




/* Implementation for IncomingPost class */

IncomingPost::IncomingPost() {}
IncomingPost::IncomingPost(int messageId, int ownerId, std::string message,
                           int likes, bool isPublic, std::string author) : Post(messageId, ownerId, message, likes) {
    isPublic_ = isPublic;
    author_ = author;
}
std::string IncomingPost::getAuthor() { return author_; }
bool IncomingPost::getIsPublic() { return isPublic_; }

std::string IncomingPost::toString() {
    std::string privateString;
    if (getIsPublic()) {
        privateString = "";
    }
    else {
        privateString = " (private)";
    }
    std::stringstream ss;
    ss << getAuthor() << " wrote" << privateString << ": " << Post::toString();
    std::string output = ss.str();

    return output;
}

bool IncomingPost::operator<(Post* right) {
    return getMessageId() < right->getMessageId();
}

std::string IncomingPost::postType() {
    std::string line;
    if (getIsPublic()) line = "public";
    else line = "private";
    return line;
}

