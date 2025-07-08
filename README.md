Step on use the following instructions to set up the project


Step 1 Create a folder for the project either manually or use the below commands in the terminal
mkdir "QE-Demo-Project"
cd "QE-Demo-Project"

Step2 Initialize the node project
npm init playwright (Only if using playwright) 

This will prompt a series of questions to help you set up your project correctly.

This will initialise the Node Package Manager
npm init: This command is used to initialize a new Node.js project. When you run it without any flags, it will interactively ask you a series of questions to gather information about your project. 

Step 3 create the GitHub Repo
Go to Github.com (Create a profile if you do not already have one) or log in
Locate the green ‘New’ button and click it. Give your project a name and description.

Step 4 Initialise the Repository in VS Code
Go to the terminal in vscode and write ‘git init’ to initialize the repository. You will see a message confirming this has been done.

Write ‘git add .’ this will all available files for tracking 
Next in the terminal write ‘git commit -am “first commit’
Next go to Github and copy the url for the project
Then in the terminal write ‘git remote add origin <url>’ (Paste the url.git after origin) for example ‘git remote add origin https://github.com/ChristopherWassell/QE-Demo-Project.git’
To check this has worked in the terminal you can type ‘git remote -v’ and you will see the url attached to any push and fetch

The final step is in the terminal type ‘git push origin master’ This will push to the master branch. After this you will be able to go to your github repo, and you will find your project files there.

Step 5 Creating a new branch in vscode

To create a new branch you can either type ‘git branch’ in the terminal or in the bottom left hand corner of vscode you can see the branch you are currently on, click that and options to create a new branch will appear at the top.

Also you can type ‘git checkout -b’ creates and checks out a new branch

The difference between the two commands is that ‘git branch’ creates a new branch. ‘Git checkout -b’ creates a new branch, and moves you to that branch.

The shortcut to creating a branch using the UI is: shift+cmd+p and type ‘branch’ into the search. This will open a branch related list at the top of the screen.
Git the branch a name. And click enter. You will have created a new branch, and will be moved to it 
By clicking on the branch it will show you what branches there are