
import os

with open(r'c:\Users\HP\Desktop\pvc\files\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line 69 is index 68.
# Line 82 is index 81.
start_idx = 68
end_idx = 82 # The view_file said 82 is </div>.

# Verification
if 'carousel-area' not in lines[start_idx] or 'owl-carousel' not in lines[start_idx]:
    print(f"FAILED VERIFICATION at line {start_idx+1}: {lines[start_idx]}")
    exit(1)

if '</div>' not in lines[end_idx-1]: # Line 82 is index 81
     print(f"FAILED VERIFICATION at line {end_idx}: {lines[end_idx-1]}")
     # exit(1) # It might be indented, so warn but proceed if confident or adjust.

# The replacement HTML
new_html = r'''    <!-- ================= DESKTOP CAROUSEL ================= -->
    <div class="carousel-area owl-carousel hero-slider-desktop d-none d-md-block">

      <!-- Desktop Slide 1 -->
      <div class="hero3-section-area"
        style="background-image: url('assets/img/carousel/1.svg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-lg-8" style="padding-left: 50px;">
              <h1 class="banner-title"><strong></strong></h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Slide 2 -->
      <div class="hero3-section-area"
        style="background-image: url('assets/img/carousel/2 copy.svg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-lg-8" style="padding-left: 50px;">
              <h1 class="banner-title"><strong></strong></h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Slide 3 -->
      <div class="hero3-section-area"
        style="background-image: url('assets/img/carousel/3 copy.svg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-lg-8" style="padding-left: 50px;">
              <h1 class="banner-title"><strong></strong></h1>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ================= MOBILE CAROUSEL ================= -->
    <div class="carousel-area owl-carousel hero-slider-mobile d-block d-md-none">

      <!-- Mobile Slide 1 -->
      <div class="hero3-section-area"
        style="background-image: url('assets/img/carousel/1.svg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-12 text-center">
              <h1 class="banner-title"><strong></strong></h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Slide 2 -->
      <div class="hero3-section-area"
        style="background-image: url('assets/img/carousel/2.svg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-12 text-center">
              <h1 class="banner-title"><strong></strong></h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Slide 3 -->
      <div class="hero3-section-area"
        style="background-image: url('assets/img/carousel/3 copy 2.svg'); background-size: cover; background-repeat: no-repeat; background-position: center;">
        <div class="container-fluid p-0">
          <div class="row m-0">
            <div class="col-12 text-center">
              <h1 class="banner-title"><strong></strong></h1>
            </div>
          </div>
        </div>
      </div>

    </div>
'''

# Replace lines [68..81] inclusive (so slice 68:82)
# actually check indices. 
# lines[68] is the start.
# lines[81] is the end </div>.
# So we replace lines[68:82] with [new_html + '\n']

lines[68:82] = [new_html + '\n']

with open(r'c:\Users\HP\Desktop\pvc\files\index.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Successfully updated index.html")
