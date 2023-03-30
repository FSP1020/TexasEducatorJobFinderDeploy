from flask import Flask, render_template
import json

app = Flask(__name__)

@app.route("/")
def index():
    f = open("employment_website/website/static/data/TexasEmploymentSites_Filled.json")
    data = json.load(f)

    # Render the template with the map
    return render_template("index.html", data=data)

if __name__ == '__main__':
    app.run(debug=True)