html = "<div>"

# Iterate through rows and columns to create the divs
for row in range(16):
    for col in range(16):
        id = f"{row:02}{col:02}"  # Format the id as requested
        html += f'<div class="tile" id="{id}"></div>'

html += "</div>"

# Output the generated HTML
print(html)