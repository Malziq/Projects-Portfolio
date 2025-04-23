//
//  network.cpp
//  SN
//
//  Created by Mazen Alziq on 10/2/24.


#include "network.h"

Network::Network() {}


std::vector<int> Network::shortestPath(int from, int to) {
    std::queue<int> q;
    std::vector<bool> visited (numUsers(), 0);
    std::vector<int> prev (numUsers(), -1);

    visited[from] = true;
    q.push(from);

    while (q.size() > 0) {
        int cur = q.front();
        q.pop();
        for (int neighbor : users_[cur]->getFriends()) {
            if (!visited[neighbor]) {
                prev[neighbor] = cur;
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    std::vector<int> output;
    int cur = to;
    while (cur != -1) {
        output.push_back(cur);
        cur = prev[cur];
    }
    std::reverse(output.begin(), output.end());
    return output;
}

std::vector<int> Network::distanceUser(int from, int& to, int distance) {
    std::queue<int> q;
    std::vector<bool> visited (numUsers(), 0);
    std::vector<int> dist (numUsers(), -1);

    dist[from] = 0;
    visited[from] = true;
    q.push(from);

    while (q.size() > 0) {
        int cur = q.front();
        q.pop();
        for (int neighbor : users_[cur]->getFriends()) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
                dist[neighbor] = dist[cur] + 1;
            }
        }
    }
    for (int i = 0; i < dist.size(); i++) {
        if (dist[i] == distance) {
            to = i;
            return shortestPath(from, to);
        }
    }
    to = -1;
    std::vector<int> vec;
    return vec;
}

std::vector<int> Network::suggestFriends(int who, int& score) {
    std::vector<int> scores (numUsers(), 0);
    std::vector<int> suggestions;

    /*
     * - I'VE PROVIDED A LONG COMMENT SINCE THE CODE IS NOT SELF-EXPLANATORY
     * - Let's say 'who' is 0.
     * - Find the set of 0's friends ---> (1, 4, 5,..)
     * - Loop through each of 0's friends, starting with 1, then find all of 1's friends ---> (0, 2).
     * - Loop through each of 1's friends, starting with 2, (skip 0),
     *   and count how many of 2's friends are also friends with 0 ---> (1, 3, 5).
     * - 2 has two friends that are friends with 0 (1 & 5), and thus, 2's score == 2
     * - Repeat the process for the rest of the friends in 0's set (4, 5, etc.)
     */
    std::vector<int> who_friends;
    for (int x : users_[who]->getFriends()) {
        who_friends.push_back(x);
    }
    // loop through each of who's friends
    for (int x : who_friends) {
        // loop through the friends of "who's" friends
        for (int y : users_[x]->getFriends()) {
            if (y == who) {
                continue;
            }
            for (int z: who_friends) {
                // check if any of them share a friend with 'who'
                if (users_[y]->getFriends().find(z) != users_[y]->getFriends().end()) {
                    scores[y] += 1;
                }
            }
        }
    }
    // Find the highest score
    int max = 0;
    for (int elem : scores) {
        if (elem > max) {
            max = elem;
        }
    }
    // If max == 0, then no suggestions are available. Return empty vector and exit the function
    if (max == 0) {
        score = 0;
        return suggestions;
    }
    for (int i = 0; i < scores.size(); i++) {
        if (scores[i] == max) {
            if (users_[who]->getFriends().find(i) == users_[who]->getFriends().end()) {
                suggestions.push_back(i);
            }
        }
    }
    score = max;
    return suggestions;
}


std::vector<std::vector<int> > Network::groups() {
    std::vector<std::vector<int> > components;
    std::vector<bool> visited (numUsers(), 0);
    std::vector<int> dup;
    int source = users_[0]->getId();

    // run DFS until all vertices have been visited
    while (!allTrue(visited)) {
        std::stack<int> stck;

        visited[source] = true;
        stck.push(source);

        while (stck.size() > 0) {
            int cur = stck.top();
            stck.pop();
            for (int neighbor : users_[cur]->getFriends()) {
                if(!visited[neighbor]) {
                    visited[neighbor] = true;
                    stck.push(neighbor);
                }
            }
        }

        std::vector<int> component;
        for (int i = 0; i < visited.size(); i++) {
            if (visited[i] == true) {
                if (find(dup.begin(), dup.end(), i) != dup.end())  {
                    continue;
                }
                dup.push_back(i);
                component.push_back(i);
            }
        }
        components.push_back(component);

        for (int i = 0; i < visited.size(); i++) {
            if (visited[i] == false) {
                source = i;
                break;
            }
        }
    }
    return components;
}

bool Network::allTrue(const std::vector<bool> visited) {
    for (bool val : visited) {
        if (!val) {
            return false;
        }
    }
    return true;
}

void Network::addUser(User* u) {
    if (u == nullptr) {
        return;
    }
    int id = u->getId();
    // id == "i" in users_[i]. If id > users.size() - 1, vector must be resized
    if (id >= users_.size()) {
        users_.resize(id + 1, nullptr);
    }
    users_[id] = u;
}

User* Network::getUser(int id) {
    // check if id is a valid index
    if(id >= 0 && id < users_.size()) {
        // even if an index exists, it could hold a null pointer
        if (users_[id] != nullptr) {
            return users_[id];
        }
    }
    return nullptr;
}

int Network::getId(std::string name) {
    for(User* u: users_) {
        if(u->getName() == name) {
            return u->getId();
        }
    }
    return -1;
}

int Network::numUsers() {
    return users_.size();
}

int Network::addConnection(std::string s1, std::string s2) {
    int id1 = getId(s1);
    int id2 = getId(s2);

    // check if user exists
    if (id1 == -1) {
        std::cout << "ERROR: " << s1 << " doesnt exist\n";
        return -1;
    }
    if (id2 == -1) {
        std::cout << "ERROR: " << s2 << " doesnt exist\n";
        return -1;
    }
    User *user1 = getUser(id1);
    User *user2 = getUser(id2);

    user1->addFriend(id2);
    user2->addFriend(id1);

    return 0;
}

int Network::deleteConnection(std::string s1, std::string s2) {
    int id1 = getId(s1);
    int id2 = getId(s2);

    // check if user exists
    if (id1 == -1) {
        std::cout << "ERROR: " << s1 << " doesnt exist\n";
        return -1;
    }
    if (id2 == -1) {
        std::cout << "ERROR: " << s2 << " doesnt exist\n";
        return -1;
    }
    User *user1 = getUser(id1);
    User *user2 = getUser(id2);

    auto &friends1 = user1->getFriends();
    auto &friends2 = user2->getFriends();

    if (friends1.find(id2) == friends1.end()) {
        std::cout << "ERROR: " << s2 << " is not a friend of " << s1 << "\n";
    }

    user1->deleteFriend(id2);
    user2->deleteFriend(id1);

    return 0;
}

void Network::readUsers(const char *fname) {
    std::ifstream infile(fname);

    if (infile) {
        std::cout << "FILE OPEN!" << std::endl;
    }
    else {
        std::cout << "FILE NOT OPEN" << std::endl;
    }

    // read the first line of the file which is the number of users
    std::string line;
    getline(infile, line);
    int numUsers = std::stoi(line);

    /*
     * Since the file contains 'n' users, and each user has 5 lines of data,
     * we can use the following technique to initialize our network:
        - 1st loop iterates 'n' times, once for each user.
        - Nested loop iterates 5 times per user, once for each line of data.
        - Users data fields (id, name, etc.) will be initialized each iteration.
     */
    for (int i = 0; i < numUsers; i++) {
        int id;
        std::string name;
        int year;
        int zip;
        std::set<int> friends;

        for (int j = 0; j < 5; j++) {
            std::string line;
            getline(infile, line);
            std::stringstream ss(line);

            switch (j) {
            case 0:
                id = std::stoi(line);
                break;
            case 1: {
                name = line;
                break;
            }
            case 2:
                year = std::stoi(line);
                break;
            case 3:
                zip = std::stoi(line);
                break;
            /* this case needs to be in its own scope
                   since we are creating new variables */
            case 4: {
                std::string val;
                while (ss >> val) {
                    int friend_ = std::stoi(val);
                    friends.insert(friend_);
                }
                break;
            }
            default:
                break;
            }
        }
        User* u = new User(id, name, year, zip, friends);
        addUser(u);
    }
    infile.close();
}

void Network::writeUsers(const char *fname) {
    std::ofstream outfile(fname);

    int numUsers = users_.size();
    outfile << numUsers << std::endl;

    for (int i = 0; i < numUsers; i++) {
        outfile << users_[i]->getId() << std::endl;
        outfile << "\t" << users_[i]->getName() << std::endl;
        outfile << "\t" << users_[i]->getYear() << std::endl;
        outfile << "\t" << users_[i]->getZip() << std::endl;

        auto & setRef = users_[i]->getFriends();
        outfile << "\t";
        for (const auto& element : setRef) {
            outfile << element << " ";
        }
        outfile << std::endl;
    }
    if (outfile) {
        std::cout << "Number of users printed "<<  numUsers << std::endl;
    }
    else {
        std::cout << "ERROR: Data was not printed to file" << std::endl;
    }
}


void Network::addPost(int ownerId, std::string message, int likes,
                      bool isIncoming, std::string authorName, bool isPublic) {

    if (ownerId < 0) return;
    int msgId = getNumPosts();
    setNumPosts();
    if (isIncoming) {
        IncomingPost* newPost = new IncomingPost(msgId, ownerId, message, likes, isPublic, authorName);
        users_[ownerId]->addPost(newPost);
    }
    else {
        Post* newPost = new Post(msgId, ownerId, message, likes);
        users_[ownerId]->addPost(newPost);
    }
}

std::string Network::getPostsString(int ownerId, int howMany, bool showOnlyPublic) {
    return users_[ownerId]->getPostsString(howMany, showOnlyPublic);
}

int Network::readPosts(char* fname) {
    std::ifstream infile(fname);
    if (!infile) return -1;

    std::string line;
    getline(infile, line);
    int numPosts = std::stoi(line);

    int postsRead = 0;

    for (int i = 0; i < numPosts; i++) {
        if (infile.eof()) {
            infile.close();
            break;
        }
        if (postsRead >= numPosts) break;
        int messageId;
        std::string message;
        int ownerId = -1;
        int likes;
        bool isIncoming = false;
        bool isPublic = false;
        std::string author;

        for (int j = 0; j < 6; j++) {
            if (infile.eof()) {
                infile.close();
                break;
            }
            std::string info;
            getline(infile, info);
            std::stringstream ss(info);
            switch (j) {
            case 0:
                ss >> messageId;
                break;
            case 1:
                message = info;
                break;
            case 2:
                ss >> ownerId;
                break;
            case 3:
                ss >> likes;
                break;
            case 4:
                if (info.find("private") != std::string::npos) {
                    isPublic = false;
                    isIncoming = true;
                }
                else if (info.find("public") != std::string::npos) {
                    isPublic = true;
                    isIncoming = true;
                }
                break;
            case 5: {
                std::string val;
                bool last = true;
                while (ss >> val) {
                    if (!last) {
                        author += " ";
                    }
                    author += val;
                    last = false;
                }
                break;
            }
            default:
                break;
            }
        }
        addPost(ownerId, message, likes, isIncoming, author, isPublic);
        postsRead++;
    }
    infile.close();
}


int Network::writePosts(char* fname) {
    std::ofstream outfile(fname);
    if (!outfile) {
        return -1;
    }
    std::vector<Post*> posts;

    int numPosts = 0;
    for (User* user: users_) {
        numPosts += user->getNumPosts();
    }
    outfile << numPosts << "\n";

    for (User* user : users_) {
        std::vector<Post*> userPosts = user->getPosts();
        //outfile << user->getName() << ": " << userPosts.size() << "\n";
        //outfile << userPosts.size() << "\n";
        for (Post* post : userPosts) {
            posts.push_back(post);
        }
    }
    std::sort(posts.begin(), posts.end());

    for (Post* post : posts) {
        //outfile << posts.size() << "\n";
        outfile << post->getMessageId() << "\n";
        outfile << "\t" << post->getMessage() << "\n";
        outfile << "\t" << post->getOwnerId() << "\n";
        outfile << "\t" << post->getLikes() << "\n";
        outfile << "\t" << post->postType() << "\n";
        outfile << "\t" << post->getAuthor() << "\n";
    }
    return 0;
}


void Network::setNumPosts() {
    numPosts_++;
}
int Network::getNumPosts() {
    return numPosts_;
}







