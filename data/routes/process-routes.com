#!/bin/csh

split -p name routes-all-xml

rm xaa

foreach i (x??)
    grep routeID $i >> toto
    grep name $i >> toto
    grep station $i >> toto
    sed '1,$s/<name>//g' toto | sed '1,$s/<\/name>//g' | sed '1,$s/<station>//g' |  sed '1,$s/<\/station>//g' | sed '1,$s/<routeID>//g' |  sed '1,$s/<\/routeID>//g' >> toto2 
    sed '1,$s/^/"/g' toto2 > toto3
    sed '1,$s/$/"/g' toto3 > $i.out
    rm toto* 
end

foreach i (x??.out)
    touch `head -1 $i | sed 's/"//g' | sed 's/ //g'`
    sed 1,2d  $i > $i.toto
    echo -n "[" >> `head -1 $i | sed 's/"//g' | sed 's/ //g'`
    ./rows2array $i.toto >> `head -1 $i | sed 's/"//g' | sed 's/ //g'`
    echo "]" >> `head -1 $i | sed 's/"//g' | sed 's/ //g'`
end     
