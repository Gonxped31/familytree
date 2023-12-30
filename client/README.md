<h2>Porject description</h2>
This app allows you to create a graph/tree to represent family members and the relation between them.

<h2>Requierement</h2>
NodeJS 20

<h2>Run the app and the server</h2>
<p>
  First, in the project directory (./.../familitree), run the app in the command line: 'npm start'.<br/>
 Then, go to the database folder (directory: ./.../familytree/src/database) and run the server with nodeJS: 'node server.js'.<br/>
 You can now start using the app !
</p>

<h2>Features</h2>
<h3>Buttons description</h3>
Here's a description of app's buttons:
<ul>
 <li>Add member: Add a new family member to the graph</li>
 <li>Remove member: Remove a family member based on the firstname only.</li>
 <li>Add relation: Add a relation between the 'from' member and the 'to' member.</li>
 <li>Remove relation: Delete the relation between the 'from' member and the 'to' member.</li>
 <li>Save graph: Save the graph with the name entered in the input field in the database.</li>
 <li>Load graph: Load the graph with the name entered in the input field from the database.</li>
 <li>Delete: Delete the graph with the name entered in the input field in the database.</li>
 <li>View my graph: Display all the graphs that you have created.</li>
 <li>Clear: Clear the graph.</li>
 <li>Current display: Display the graph as a 'graph'(without hierarchy) or as a 'tree'(with hierarchy)</li>
</ul>

<h3>Graph description</h3>
<p>
  You can see the informations of the node and modify it by clicking on this node. Be carefull, when you click on the node, the default values in the input fields are the actual informations.<br/>
  You can also move and zoom on the graph area.
</p>

<h2>Warnings and possible errors</h2>
-> Always run the server before the react app.<br/>
-> Don't reload the page while the server is running.