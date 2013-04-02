// ### Screen3D.prototype.resize()
// Adjust the rendering if the screen is resized
//
// *@param {number}* The new width  
// *@param {number}* The new height  
// *@returns {Screen3D}*
resize(width : number, height : number) : Screen3D {
	this.renderer.setSize(width, height);
	this.camera.aspect = width / height;
	this.camera.updateProjectionMatrix();

	return this;
}