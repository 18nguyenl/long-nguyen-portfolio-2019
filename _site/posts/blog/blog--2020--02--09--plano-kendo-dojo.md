---
layout: layouts/base.njk
title: 'Plano Kendo Dojo '
date: 2019-06-07T06:05:50.237Z
thumbnail: /images/uploads/image.jpg
tags:
  - blog
  - work
---
Plano Kendo is a Kendo dojo where people of all ages and backgrounds can come and understand the beauty of Kendo. Originally, kendo was kenjutsu, a sword martial art used by ancient samurai. Today, kendo exists as a martial art to preserve the physical and mental discipline of kenjutsu. Plano Kendo exists as a place to bridge this tradition to people in a fun, powerful way.

## The Design
For me, this meant that I had to design a website that was welcoming to anyone who entered. It has to be fun, not intimidating. I noticed that on Dribble, designers and people tend to think sword = dangerous, violent, serious, formal, and clean. While other dojos may focus on that, Plano Kendo is all about the freedom and fun, so I started off designing my website in blue and rectangles.

## Starting on the Design
Why did I use the color blue? I thought formal too hard. Notice how cold it is. Notice the rectangles and rigidity. It feels like this dojo is an office. Originally the rectangles was a shout-out for Japanese design which tends to be rectangles. It’s functional, gets the job done, geometric, and vertical.

## Typography, a True Science
Not sure what color was next, I awkwardly decided to work on the typography. This was a hard one — how do you find a type that’s formal, yet fun? Obviously you can be formal and fun, but how do you just look at text and say yuuuup that’s fun. How do I choose one that’s optimized for readability? I ended up choosing Oswald and Roboto Slab. Oswald because it’s bold, ambitious, serious, modern, yet it has passion and spirit. I can say this because Oswald is tall, big, and bold; I would call Oswald superman. For Roboto Slab, I chose you because you look better with Oswald. If you haven’t raised your eyebrows at my selection process, you should now. This is a terrible way to choose type. While the feelings are important, the structure of type is equally important when choosing it. I should have started with the body type because people are gonna read that first and follow up with the header type. I don’t want to get into the technicals right now, but it’s a real science that takes practice. I ended up staying with Oswald because of the feelings I mentioned before, and because of its vertical, tall characteristics. I switched the body type to Roboto Condensed because using Oswald again would be overkill. Roboto Condensed isn’t very geometric, but it has human characteristics (I want to call it a humanist type but I’m not sure). It matches with Oswald’s height and the human part brings warmth to the fun feeling I need. I’m still not sure if this is the best type combo, but again it’s a science, and I still need to read up on my typography theory to get better at this (I hadn’t even considered the readability part of this).

## Site Layout, Zig-Zags, and the Fence
After getting the type “done”, the next step was the layout. The layout is actually the typical zig-zag layout for most landing pages. My reasoning is that it just works. It’s a natural way to read content, so it works. I don’t like this thinking because it’s lazy design thinking. I think I could have experimented more to deviate. Some things that could have helped was to use contrast and scale better. Notice the cramped feeling at some parts. Notice an awkward messy feeling in other parts. This is coming from awkward layout, awkward contrast, awkward scale. The layout would be better if I had been more ambitious. Ambitious?? Big design lesson from this project: if you make a design decision, don’t be on the fence. Go home or go big. The hierarchy and flow could be massively be improved. The message the the rectangles, the pictures, everything could be improved with some more emphasis. It’s as if everything is either fighting each other or hiding for some parts. The art direction is kind of mixed (I say this because I can’t immediately find a feeling to describe the website on glance) and I think the on-the-fence layout is attributing to this issue.

## Getting Back to the Colors
After layout, I started feeling awkward about the color. I knew it felt like the dojo was an office in Antarctica, but why? Well because duh, it’s all blue — where’s the contrast?? But red is so aggressive, agh! Kendo already is a sport that feels killer to people, what’s the compromise? Red + blue = purple. Just. Wow. Red is about passion and aggressiveness; blue speaks formal and diligence; sakura purple is graceful and peaceful. Mix all them in gradients and put them everywhere, you get fun plus all the great feelings from the colors on their own. Unfortunately just pairing this color with the layout slightly helps, but they still kind of fight in my opinion. This is part of the on-the-fence design issue.

## Development Development Develop…
The thing I’m most proud of this website for is that I used raw HTML, CSS, and JavaScript. Yuup. NO LIBRARIES! Begone libraries!! (not really I love y’all). Anyways, the biggest difference between this site and my previous sites is that my HTML is 100% more semantic, my CSS is SCSS, my JavaScript has no jQuery. Yup. Die you foolish divs! Die repetitive CSS selectors that make my code really confusing to read! Die using jQuery just to select elements when I could do the same with raw JavaScript! But it’s not all sugar and gummy bears for switching away from CSS. I’ll explain that part later. If you’re curious about the deployment strategy for this site, it’s Netlify. Literal magic. Literally. Magic.

## Site Layout
I used sections, articles, figures, and buttons for the first time in my poor life. Semantic HTML is awesome, and it really helped me read all the code. For the layout, I was inspired by “stacking blocks” for sections and everything. I wanted to try to modularize the site section as blocks to make editing easier in the future. This was a big benefit as it really did help. I’ll be doing this next time.

## SCSS
For the SCSS, I used flexboxes like my life depended on it. This was the first project where I wasn’t reluctant to use them. Internet Explorer partially supports them so I’m not using any excuses to not use them anymore. Pretty much every article and every section used flexbox to space, arrange, and “lay out” my content. Most notably, the gallery used the flex property to wrap and arrange the pictures. I thought I needed CSS grid for that, but flexbox worked wonderfully. If flexbox was a person, I’d tell em’ I wanna be bffs. Box friends forever.

## How’d You do That Overflowing Rectangle Thing
For the identity block, the article rectangle overflows. Duh. Obviously it overflows. Exactly — it’s not just a z-index issue even though it appears like one when working on the code. It’s an absolute positioning problem combined with overflows. I’m mentioning specifically that rectangle because it was evil (it looks so simple). It took an unnecessarily long time for no apparent reason so watch out for this fellow developers!

## That Sensei Block Looks Pretty Wild
For the sensei biography block, it’s actually flexbox magic with a cinch of relative positioning.

## How is Your Site Not Slow from the Japanese?
All the Japanese Kanji are SVG <img> . It saves some of that sweet sweet loading time.

## How’d you do Those Animations?
All the navigation animations are CSS transitions. Some are exponentially eased and the others could be cubic ease in-out. Actually an interesting problem was that there was an FOUC on load for the menu. This was fixed with some JavaScript and visibility: hidden. The JavaScript waited until the menu did it’s FOUC (with the event transitioned) thing then just turned the visibility back to visible. This problem shouldn’t happen, but my theory is because of user agent stylesheets, loading times, and delays, FOUC happens to transitions.

## Dang the Background Pictures look Cool
The gradient backgrounds are all background images exported by Figma. Why? Microsoft Edge and Internet Explorer exists. The backgrounds are technically layers of linear-gradients and background images. Cool stuff, but not actually that cool at all.

## The Subpages Look the Same
Think flexbox and templates. Bam. Now you can imagine how it’s all laid out. The only thing I want to mention about the subpages was a profoundly interesting problem. On the Our Dojo page, it took an epoch to load. Why? WHYYYYYYYY? It’s not huge images, it’s not the fact that I was using 5 fonts from Google Fonts (including Japanese and Korean) surprisingly, it’s not mobile performance. Everything is slow on mobile, but fast on desktop. Answer: make sure you put lang attributes on your mixed language stuff. Browsers look for lang attributes to optimize content on the site. Without it, you get lag and hang that lasts a solid 3+s and honestly that’s 3s closer to someone leaving your site. Now I will remember for the rest of my life to include lang attributes to foreign languages in my HTML.

## Why Switching to SCSS Wasn’t All Sweet
Load times honestly suck and without Netlify using their god-tier CDN, I would be in so much pain. Why? The compiled CSS from the SCSS is putrid. In addition, the SCSS is pretty nasty as well. Imagine if my SCSS and CSS was the maze in Maze Runner. Yup. We’d all die. So the lesson of this story kids is that just because you use fancy shmancy SCSS does not mean your CSS is any better! You can know an infinite amount of CSS syntax, but under the devil that is CSS specificity, you are powerless. Why didn’t it style? Specificity. It’s not doing what I want! Specificity. But the MDN says this and I did that — why? Specificity. Honestly, specificity is awesome, but when you have 1000+ lines of CSS, you honestly just don’t want. But what’s the solution? Well smart smart people out there created something call CSS methodologies like BEM and ITCSS. They give us rules to help avoid the specificity devil and overall make cleaner CSS.

## Good Tips and Tricks I Learnt
Use Figma styles. They really help.

The spacing between body text and heading isn’t arbitrary all the time. There’s something called vertical and horizontal rhythm that has to be accounted for if you want to make more harmonic layouts.

Font pairing is a big science. If you don’t get it, stick with less type.

Don’t reuse designs. Two different art directions don’t mix.

Mobile first seems pretty useful for developing things.

When it’s something consistent like colors, type, margin, padding, spacing, etc… don’t hesitate to use CSS or SCSS variables.

You think that navs and footers and copy paste for every subpage. Not until you start bug fixing. You’ll want to curse the thought that they were copy paste.

Reusability in code is great

Researching about a design topic makes the design deeper in quality

Beware of CSS specificity

##Thank You
If you’ve reached here. Thank you so much! This was honestly a very difficult yet fun project! This was my first project for Zeal IT Consultants, and it’s been a blast making this. I wrote this “case study” to reflect and grow as a developer and designer. I sure learned many things from this, and I hope you did too! Thanks so much for reading again!
