#include "profilewindow.h"
#include "ui_profilewindow.h"

ProfileWindow::ProfileWindow(std::string loginName_, int userId_, Network network_,
                             std::string loggedInUser_, int loggedInUserId_, QWidget *parent)
    : QWidget(parent)
    , ui(new Ui::ProfileWindow)
    , loginName(loginName_)
    , userId(userId_)
    , network(network_)
    , loggedInUser(loggedInUser_)
    , loggedInUserId(loggedInUserId_)
{
    ui->setupUi(this);
    connect(ui->profileTable, &QTableWidget::cellClicked, this, &ProfileWindow::cellClicked);
    connect(ui->homeButton, &QPushButton::clicked, this, &ProfileWindow::homeButtonClicked);
    connect(ui->friendButton, &QPushButton::clicked, this, &ProfileWindow::addFriendClicked);
    connect(ui->suggestionTable, &QTableWidget::cellClicked, this, &ProfileWindow::suggestionClicked);

    // Set up the timer to update the clock every second
    QTimer *timer = new QTimer(this);
    connect(timer, &QTimer::timeout, this, &ProfileWindow::updateClock);
    timer->start(1000); // Update every second

    updateClock();  // Initial clock display
}

void ProfileWindow::updateClock() {
    QString currentTime = QDateTime::currentDateTime().toString("hh:mm:ss AP");
    ui->lcdClockLabel->setText(currentTime);  // Update the QLabel with the current time
}



void ProfileWindow::showProfilePage(std::string displayName, int userId) {
    network.readUsers("users.txt");
    network.readPosts("posts.txt");
    ui->suggestionTable->clear();
    ui->profilePosts->clear();
    ui->profileTable->show();
    ui->profileTable->setRowCount(1);
    ui->profileTable->setColumnCount(30);
    ui->profileLabel->show();

    // check if the user is the same one who logged in
    if (displayName == loggedInUser) {
        ui->profileLabel->setText("My Profile");

        ui->friendButton->hide();
        ui->suggestionLabel->show();
        ui->suggestionTable->show();
        ui->suggestionTable->setRowCount(1);
        ui->suggestionTable->setColumnCount(15);

        int score;
        std::vector<int> suggestions = network.suggestFriends(userId, score);

        // populate the friend suggestions table
        for (int i = 0; i < suggestions.size(); i++) {
            std::string name = network.getUser(suggestions[i])->getName();
            QTableWidgetItem *item = new QTableWidgetItem(QString::fromStdString(name));
            ui->suggestionTable->setItem(0, i, item);
        }
    }
    else {
        ui->profileLabel->setText(QString::fromStdString(displayName));
        ui->homeButton->show();
        ui->friendButton->show();
        ui->suggestionLabel->hide();
        ui->suggestionTable->hide();
    }

    User* user = network.getUser(userId);

    // Load in all the user's friends, store in a vector
    std::vector<std::string> names;
    for (int friendId : user->getFriends()) {
        User* friendPtr = network.getUser(friendId);
        std::string friendName = friendPtr->getName();
        names.push_back(friendName);
    }

    // iterate through vector to populate the table with usernames
    for (int i = 0; i < names.size(); i++) {
        QTableWidgetItem *item = new QTableWidgetItem(QString::fromStdString(names[i]));
        ui->profileTable->setItem(0, i, item);
    }

    // populate the Qlabel of user's posts
    int count = 0;
    for (Post* post : user->getPosts()) {
        if (count >= 5) break;
        if (displayName != loggedInUser) { // check if profile doesnt belong to logged in user
            if(!post->getIsPublic()) { // check if incoming post is public. Non-incoming will always be public
                continue;
            }
        }
        QString message = QString::fromStdString(post->getMessage());
        ui->profilePosts->setText(ui->profilePosts->text() + "\n" + message);
        count++;
    }
}

void ProfileWindow::cellClicked(int row, int column) {
    QTableWidgetItem *item = ui->profileTable->item(row, column);
    if (item) {
        loginName = item->text().toStdString();
    }
    userId = network.getId(loginName);
    network.getUser(userId);
    showProfilePage(loginName, userId);
}

void ProfileWindow::suggestionClicked(int row, int column) {
    QTableWidgetItem *item = ui->suggestionTable->item(row, column);
    if (item) {
        loginName = item->text().toStdString();
    }
    userId = network.getId(loginName);
    network.getUser(userId);
    showProfilePage(loginName, userId);
}


void ProfileWindow::homeButtonClicked() {
    showProfilePage(loggedInUser, loggedInUserId);
}


void ProfileWindow::addFriendClicked() {
    network.getUser(loggedInUserId)->addFriend(userId);
    network.getUser(userId)->addFriend(loggedInUserId);
    network.writeUsers("users.txt");
    showProfilePage(loginName, userId);
}

ProfileWindow::~ProfileWindow()
{
    delete ui;
}
