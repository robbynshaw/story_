const posts = {
  'https://story_.com/posts/1': {
    date: '2019-01-15 01:12:11',
    type: 'markdown',
    content: `# Peter Pan

> By J. M. Barrie [James Matthew Barrie]

> A Millennium Fulcrum Edition

> (c)1991 by Duncan Research

## Chapter 1 PETER BREAKS THROUGH 

All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother. I suppose she must have looked rather delightful, for Mrs. Darling put her hand to her heart and cried, “Oh, why can't you remain like this for ever!” This was all that passed between them on the subject, but henceforth Wendy knew that she must grow up. You always know after you are two. Two is the beginning of the end.

Of course they lived at 14 [their house number on their street], and until Wendy came her mother was the chief one. She was a lovely lady, with a romantic mind and such a sweet mocking mouth. Her romantic mind was like the tiny boxes, one within the other, that come from the puzzling East, however many you discover there is always one more; and her sweet mocking mouth had one kiss on it that Wendy could never get, though there it was, perfectly conspicuous in the right-hand corner. 
        `,
  },
  'https://story_.com/posts/2': {
    date: '2019-01-15 01:12:11',
    type: 'markdown',
    content: ` The way Mr. Darling won her was this: the many gentlemen who had been boys when she was a girl discovered simultaneously that they loved her, and they all ran to her house to propose to her except Mr. Darling, who took a cab and nipped in first, and so he got her. He got all of her, except the innermost box and the kiss. He never knew about the box, and in time he gave up trying for the kiss. Wendy thought Napoleon could have got it, but I can picture him trying, and then going off in a passion, slamming the door.

Mr. Darling used to boast to Wendy that her mother not only loved him but respected him. He was one of those deep ones who know about stocks and shares. Of course no one really knows, but he quite seemed to know, and he often said stocks were up and shares were down in a way that would have made any woman respect him.

Mrs. Darling was married in white, and at first she kept the books perfectly, almost gleefully, as if it were a game, not so much as a Brussels sprout was missing; but by and by whole cauliflowers dropped out, and instead of them there were pictures of babies without faces. She drew them when she should have been totting up. They were Mrs. Darling's guesses.

Wendy came first, then John, then Michael. 
        `,
  },
  'https://story_.com/posts/3': {
    date: '2019-01-15 01:12:11',
    type: 'markdown',
    content: ` For a week or two after Wendy came it was doubtful whether they would be able to keep her, as she was another mouth to feed. Mr. Darling was frightfully proud of her, but he was very honourable, and he sat on the edge of Mrs. Darling's bed, holding her hand and calculating expenses, while she looked at him imploringly. She wanted to risk it, come what might, but that was not his way; his way was with a pencil and a piece of paper, and if she confused him with suggestions he had to begin at the beginning again.

“Now don't interrupt,” he would beg of her.

“I have one pound seventeen here, and two and six at the office; I can cut off my coffee at the office, say ten shillings, making two nine and six, with your eighteen and three makes three nine seven, with five naught naught in my cheque-book makes eight nine seven—who is that moving?—eight nine seven, dot and carry seven—don't speak, my own—and the pound you lent to that man who came to the door—quiet, child—dot and carry child—there, you've done it!—did I say nine nine seven? yes, I said nine nine seven; the question is, can we try it for a year on nine nine seven?”
        `,
  },
  'https://story_.com/posts/4': {
    date: '2019-01-15 01:12:11',
    type: 'markdown',
    content: ` “Of course we can, George,” she cried. But she was prejudiced in Wendy's favour, and he was really the grander character of the two.

“Remember mumps,” he warned her almost threateningly, and off he went again. “Mumps one pound, that is what I have put down, but I daresay it will be more like thirty shillings—don't speak—measles one five, German measles half a guinea, makes two fifteen six—don't waggle your finger—whooping-cough, say fifteen shillings”—and so on it went, and it added up differently each time; but at last Wendy just got through, with mumps reduced to twelve six, and the two kinds of measles treated as one.

There was the same excitement over John, and Michael had even a narrower squeak; but both were kept, and soon, you might have seen the three of them going in a row to Miss Fulsom's Kindergarten school, accompanied by their nurse. 
        `,
  },
  'https://story_.com/posts/5': {
    date: '2019-01-15 01:12:11',
    type: 'markdown',
    content: `Mrs. Darling loved to have everything just so, and Mr. Darling had a passion for being exactly like his neighbours; so, of course, they had a nurse. As they were poor, owing to the amount of milk the children drank, this nurse was a prim Newfoundland dog, called Nana, who had belonged to no one in particular until the Darlings engaged her. She had always thought children important, however, and the Darlings had become acquainted with her in Kensington Gardens, where she spent most of her spare time peeping into perambulators, and was much hated by careless nursemaids, whom she followed to their homes and complained of to their mistresses. She proved to be quite a treasure of a nurse. How thorough she was at bath-time, and up at any moment of the night if one of her charges made the slightest cry. Of course her kennel was in the nursery. She had a genius for knowing when a cough is a thing to have no patience with and when it needs stocking around your throat. She believed to her last day in old-fashioned remedies like rhubarb leaf, and made sounds of contempt over all this new-fangled talk about germs, and so on. It was a lesson in propriety to see her escorting the children to school, walking sedately by their side when they were well behaved, and butting them back into line if they strayed. On John's footer [in England soccer was called football, “footer” for short] days she never once forgot his sweater, and she usually carried an umbrella in her mouth in case of rain. There is a room in the basement of Miss Fulsom's school where the nurses wait. They sat on forms, while Nana lay on the floor, but that was the only difference. They affected to ignore her as of an inferior social status to themselves, and she despised their light talk. She resented visits to the nursery from Mrs. Darling's friends, but if they did come she first whipped off Michael's pinafore and put him into the one with blue braiding, and smoothed out Wendy and made a dash at John's hair. 
        `,
  },
}

class PostRepo {
  constructor() {
    this.posts = posts
  }

  get(id) {
    return new Promise(res => res(this.posts[id]))
  }
}

export default PostRepo
