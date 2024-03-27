## Short demo about showing the model on the website

### Work Step:
1. Open the pdb files in UCSF Chimera
2. Choose Tools -> sequence -> sequence to select
3. Once select the sequence, then choose Actions -> color -> any color
4. File -> export scene -> choose x3d files
5. Then import the x3d files in blender, delete the central cube
6. Export the file as glTF 2.0, make sure in Material, image quality is set to 100
7. Open the script.js and replace the file in the loader.
