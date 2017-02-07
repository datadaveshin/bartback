#!/bin/sh
# Copyright David Shin 2016
# 
# Takes input file with a single column (multiple rows) of data
# Outputs as a single comma-delimited line with spaces after
# each comma to stdout
# This is fitting to put into a JavaScript array or Python list
#
# Usage ./rows2array <filename> 

awk '{print $1 ", "}' $1 |  tr -d '\n'    # space after comma
