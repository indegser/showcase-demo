# This is demo for Apple style product page

## How to generate video thumbnails

1. Install [ffmpeg](https://www.ffmpeg.org/)

2. Prepare Video

3. Run ffmpeg video to image-series command

`ffmpeg -i [video_name].mov -vf scale=1280:-1 -r 60 ~/cuts/image%06d.png`
