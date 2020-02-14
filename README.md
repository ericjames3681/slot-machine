# Eric's Slot-Machine

## The Game
Inspired by novelty gambling machines meant to pass the time in New York bars in the late 1800s, **SLOTS** is a fun and addictive game that requires no skill but demands your attention. If you haven't played the slots, or it's been awhile, allow me paraphrase: a player places a wager and pulls a lever or pushes a button and a series of spinning wheels (typically 3) will spin vertically. As the wheel stops, a random pattern will emerge. If the middle row align a series of identical images, the player will win. Some series appear more or less frequently by design, and will multiply a player's winning return at corresponding ratios. The rarest and highest pay out? **JACKPOT!**
#### (For more on Slots, visit the Wikipedia link below)
[Wikipedia Link](https://en.wikipedia.org/wiki/Slot_machine#History)


## How it will play onscreen
A player will have an inviting welcome screen, displaying the resting image of a slot machine screen and a brief description of what a win or "jackpot" would look like. State will be initialized to null in terms of player's money but the winning combos and their corresponding multipliers will be constant in state. Player will input his amount to be wagered and this be will be continually updated with each click of spin, subtracting the individual wager. It will **ALWAYS SUBTRACT**, adding will happen conditionally. This will be rendered onscreen after each "spin". Animation of randomly generated rows of images will display but stop in rows after a short time, spinning message will alert a player that there's no going back now, the slots are in motion!

Also included is a mobile-friendly version, with action buttons aligned for a right handed phone user.

## Wireframe
![](images/wireFrame.jpg)

## Welcome Screen
![](images/Slot-Welcome.png)

## Loss
![](images/Loss-Display.png)

## JACKPOT!
![](images/Jackpot-Display.png)

## Wins
IF player hits on a winning combo, his running total of avail money to be gambled will increase. To heighten user experience, screen will have various screen animations to be triggered with various intensity depending on how big the win. Cashout button will serve as a **RESET**, clearing the state and starting over.

## Technology Used

1. Javascript
2. HTML
3. CSS

## Future Development
For now, the game will simply have the middle of the three rows be the determining win row, but futute updates could include three rows and diagonals for additional wagers to increase the likeleyhood of a win. I'd like to incorporate a "bonus spin" feature as well, to reward players for a certain amount of time of money spent playing. Better animations, various payment options, sharing acheivements(wins) on social media may also be developed in the future. 

In the future I would also like to include brighter, more satisfying "win displays". Win sounds and fullscreen flashing messages maight be jarring to a user, but could be done tastefully as well to encourage time spent on app. Ethically though, this game should not be designed to addict a user, so i'd also like to set auto-reminders such as "it has been 15 minutes, would you like to take break?" or "please gamble responsibly".

## Don't forget to "give it a spin" below...
[Eric's Slot-Machine](https://ericjames3681.github.io/slot-machine/)



