#ifndef PROFILEWINDOW_H
#define PROFILEWINDOW_H

#include <QWidget>
#include <QLCDNumber>
#include <QTimer>
#include <QDateTime>
#include "user.h"
#include "network.h"
#include "post.h"
#include <string>

namespace Ui {
class ProfileWindow;
}

class ProfileWindow : public QWidget
{
    Q_OBJECT

public:
    explicit ProfileWindow(std::string loginName, int userId, Network network, std::string loggedInUser,
                           int loggedInUserId, QWidget *parent = nullptr);
    ~ProfileWindow();

    // Displays the profile page of a user
    void showProfilePage(std::string displayName, int userId);

    // callback method when the user clicks a cell on the friends table
    void cellClicked(int row, int column);

    // callback method when the user clicks a cell on the friend suggestions table
    void suggestionClicked(int row, int column);

    // callback method for the button that returns logged in user their profile page
    void homeButtonClicked();

    // callback method for button to add a friend
    void addFriendClicked();

    // updates the clock in real time
    void updateClock();


private:
    Ui::ProfileWindow *ui;
    std::string loginName = "";
    std::string loggedInUser = "";
    int loggedInUserId = -1;
    int userId = -1;
    Network network;
};

#endif // PROFILEWINDOW_H
