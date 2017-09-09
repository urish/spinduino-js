// 608ZZ Bearing Cap with Magnet holes
// Copyright (C) 2017, Uri Shaked

$capHeight = 3;
$spacerHeight = 0.6;
$capRadius = 11;
$roundness = 0.5;
$magnetRadius = 1.25;

$fn = 60;

module rounded_cylinder(r,h,edge=0.2) {
    rotate_extrude() {
        hull() {
            square([r, h]);
            translate([r, edge])
            circle(edge);
            translate([r, h-edge])
            circle(edge);
        }
    }
}


translate([0,0,$capHeight+$spacerHeight])
difference() {
    union() {
        translate([0,0,2.4])
        rounded_cylinder(r=4.25,h=0.6);
        cylinder(r=4,h=2.4);
    }
    
    translate([-5,-0.4,0])
    cube([10,0.8,3]);
    
    rotate([0,0,90])
    translate([-5,-0.4,0])
    cube([10,0.8,3]);
}

translate([0,0,$capHeight])
cylinder(r=6,h=$spacerHeight);

difference() {
    rotate_extrude() {
        translate([0, $capHeight/2])
        square([4.2, $capHeight/2]);

        hull() {
            translate([0, 0])
            square([1, $capHeight]);
            
            translate([$capRadius, $roundness])
            scale([2,1])
            circle($roundness);
            
            translate([$capRadius, $capHeight-$roundness])
            
            circle($roundness);
        }
    }
    
    translate([0,$capRadius-$magnetRadius-0.25,1])
    cylinder(r=$magnetRadius,h=$capHeight+1);
    
    translate([$capRadius-$magnetRadius-0.25, 0,1])
    cylinder(r=$magnetRadius,h=$capHeight+1);
}
