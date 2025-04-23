#ifndef LOGINWINDOW_H
#define LOGINWINDOW_H

#include <QMainWindow>
#include <QLCDNumber>
#include <QTimer>
#include <QDateTime>
#include "user.h"
#include "network.h"
#include "post.h"

QT_BEGIN_NAMESPACE
namespace Ui {
class LoginWindow;
}
QT_END_NAMESPACE

class LoginWindow : public QMainWindow
{
    Q_OBJECT

public:
    LoginWindow(QWidget *parent = nullptr);
    ~LoginWindow();

    // callback method for the login page
    void loginButtonClicked();

    // Displays a buffer page to check if the user logged in as themselves
    void confirmationPage();

    // callback method for the confirmation page
    void confirmButtonClicked();

    // updates the clock in real time
    void updateClock();

private:
    Ui::LoginWindow *ui;
    Network network;
    std::string loginName = "";
    std::string loggedInUser = "";
    int loggedInUserId = -1;
    int userId = -1;
    bool isLoggedInUser = false;
};
#endif // LOGINWINDOW_H
