#!/bin/bash
paste tag-front-open abbr-list tag-front-close station-list tag-back | sed '1,$s/	//g' > station-list-tags
