//
// Created by Mazen Alziq on 10/25/24.
//

#include <string>
#include <sstream>

#ifndef POST_H
#define POST_H


class Post {
public:
    Post();
    Post(int messageId, int ownerId, std::string message, int likes);
    int getMessageId();
    int getOwnerId();
    int getLikes();
    std::string getMessage();
    virtual std::string toString();
    virtual std::string postType(); // used in the writePosts method
    virtual std::string getAuthor();
    virtual bool getIsPublic();
    bool operator<(Post *right);

private:
    int messageId_;
    int ownerId_;
    int likes_;
    std::string message_;

};


class IncomingPost : public Post {
public:
    IncomingPost();
    IncomingPost(int messageId, int ownerId, std::string message, int likes, bool isPublic, std::string author);
    std::string toString();
    std::string getAuthor();
    std::string postType(); // used in the writePosts method
    bool getIsPublic();
    bool operator<(Post *right);
private:
    std::string author_;
    bool isPublic_;
};


#endif //POST_H
