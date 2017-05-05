# Jet Fuel Submission Form

[Project Spec](http://frontend.turing.io/projects/jet-fuel.html)

* Fork this repo, if you haven't already and check out a branch
* Use this README as a template to create a file in this folder with your name as the title.
* Submit a pull request
* Pro Tip: You can use [recordit.co](http://recordit.co/) to record interaction gifs.
* Secondary Pro Tip: [Here's how to link to specific line number(s) in Github](http://stackoverflow.com/questions/23821235/how-to-link-to-specific-line-number-on-github)
* Tertiary Pro Tip: You can re-use some of these things in your portfolio/resume

------

# Basics

#### Link to the Github Repository for the Project
[jet-fuel](https://github.com/thatPamIAm/jet-fuel/)

#### Link to the Deployed Application
[AUERONATICAL FUEL!](aeronautical-fuel.herokuapp.com)

#### Link to Your Commits in the Github Repository for the Project

-[Pam](https://github.com/thatPamIAm/jet-fuel/commits/master?author=thatPamIAm)

-[Hugh](https://github.com/thatPamIAm/jet-fuel/commits/master?author=hmorri32)

#### Provide a Screenshot of your Application

![Imgur](http://i.imgur.com/Dbgtp9q.png)

![Imgur](http://i.imgur.com/tODZQQy.png)

![recordit](http://g.recordit.co/2xKX5de4bP.gif)

## Completion

#### Were you able to complete the base functionality?
* Yes - everything but the sort functionality by date

#### Which extensions, if any, did you complete?

- N/A

# Code Quality

#### Link to a specific block of your code on Github that you are proud of
[Core Redirect Code Block](https://github.com/thatPamIAm/jet-fuel/blob/master/server.js#L81-L91)

* Why were you proud of this piece of code?

Writing this block of code represented a monumental paradigm shift in my thought process surrounding the functionality in the backend. Client side javascript, for me, seems inordinately complex. Actually shortening the urls, then redirecting to their respective longer URLs seemed to be the crux of this project. It was, however, not. Implementing the shortening and redirecting action helped solidify what it was that we were actually meant to be doing. It also made me less apprehensive when approaching certain problems in our server side code.

#### Link to a specific block of your code on Github that you feel not great about
[Code block that handles clicking sort by date btn](httpshttps://github.com/thatPamIAm/jet-fuel/blob/master/public/index.js#L134-L148github.com)

[Corresponding sorting function](https://github.com/thatPamIAm/jet-fuel/blob/master/public/index.js#L178-L182)

* Why do you feel not awesome about the code? What challenges did you face trying to write/refactor it?

As evidenced by the code, this is a complete work in progress. I have yet to figure out how to sort our URLs by the date/time at which they were created. We used an npm package called moment.js in order to restructure the ISO timestamp and convert it to something more readable. And so, the created_at data comes back as, for example, "today at 1:50pm". The data is actually stored in the database as originally described though. We tried to sort by date in the index.js file, which interacts with the dom. And so, it would be a matter of parsing the necessary numbers out and consequently sorting them. Or, figuring out a way to sort them on the backend side. Still have not figured out how to implement either approach. I am displeased with this code as sorting by date is a requirement on this project and I'm generally not cool with leaving things unfinished.

Also I am generally displeased with the format and length of our index.js file. It is in desperate need of refactoring/reformatting. JQuery and vanilla javascript don't seem to do well with importing and exporting files/functions. I'm sure there is a workaround that does not involve using several script tags in the index.html, though I haven't figured out what it is.

Testing on this codebase was problematic as well. The before and afterEach hooks in our routes test suite seemed erratic and unpredictable. I would have liked to test the DOM interaction more and also would have liked to test the helper URL validation regex functions we used.

#### Attach a screenshot or paste the output from your terminal of the result of your test-suite running.

![Imgur](http://i.imgur.com/0ChELQu.png)

#### Provide a link to an example, if you have one, of a test that covers an 'edge case' or 'unhappy path'

![Imgur](http://i.imgur.com/ylGOGm6.png)

-----

#### Please feel free to ask any other questions or make any other statements below!

Cool project. Quite enjoyable. Back end code isn't so scary after all.

-----

# Instructor Feedback

- Points: x / 150
