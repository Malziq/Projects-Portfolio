//  network.h
//  Social Network
//
//  Created by Mazen Alziq on 10/2/24.
//

#include <fstream>
#include <sstream>
#include <vector>
#include <algorithm> // for std::sort
#include <set>
#include <queue>
#include <stack>
#include "user.h"
#ifndef NETWORK_H
#define NETWORK_H

class Network {
public:
    /* Default Constructor */
    Network();

    // PRE: None
    // POST: Return a vector with the (shortest) path of from - to
    std::vector<int> shortestPath(int from, int to);

    // PRE: None
    // POST: Return a vector with the path to a user for a given distance
    std::vector<int> distanceUser(int from, int& to, int distance);

    // PRE: None
    // POST: Return a vector with friend suggestions
    std::vector<int> suggestFriends(int who, int& score);

    // PRE: None
    // POST: Return a vector with the connected components of the graph
    std::vector<std::vector<int> > groups();

    // helper function for groups DFS
    bool allTrue(const std::vector<bool> visited);

    /*
     PRE: Receive a user's id
     POST: Return a pointer to a user object
     */
    User* getUser(int id);

    /*
     PRE: Receive a pointer to a user object
     POST: Add the user to the users_ vector
     */
    void addUser(User* u);

    /*
     PRE: Receive a file name, read in & parse its data
     POST: Create and populate a network with the data
     */
    void readUsers(const char* fname);

    /*
     PRE: Receive a file name to write to
     POST: Populate the file with data
     */
    void writeUsers(const char* fname);

    /*
     PRE: None
     POST: Return number of users in the network
     */
    int numUsers();

    /*
     PRE: Receive 2 friends names (strings)
     POST: Add the friends ids to their "friends_" set
     */
    int addConnection(std::string s1, std::string s2);

    /*
     PRE: Receive 2 friends names (strings)
     POST: Remove the friends ids to their "friends_" set
     */
    int deleteConnection(std::string s1, std::string s2);

    /*
     PRE: Receive a user's name
     POST: Return the user's ID
     */
    int getId(std::string name);

    /*
     PRE: Receives post specifications
     POST: Creates a post object for a specific user
     */
    void addPost(int ownerId, std::string message, int likes, bool isIncoming, std::string authorName, bool isPublic);


    // Returns a string that specifies a # of recent posts
    std::string getPostsString(int ownerId, int howMany, bool showOnlyPublic);

    // PRE: Receives a file name
    // POST: Reads data of user's posts from the file
    int readPosts(char* fname);

    // PRE: Receives a file name
    // POST: Writes data of user's posts to the file
    int writePosts(char* fname);

    //PRE: A post object has been created
    //POST: numPosts is incremented by 1
    void setNumPosts();

    //PRE: A post object is about to be created
    //POST: getNumPosts corresponds to a message ID. If num posts == 0, messageID == 0
    int getNumPosts();


private:
    std::vector<User*> users_;
    int numPosts_ = 0;
};

#endif

