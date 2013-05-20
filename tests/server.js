var expect = require( 'expect.js' ),
    jsValidator = require( '../jsValidator' );

describe( 'jsValidator suite', function () {
  describe( 'Assert', function () {
    var assert = new jsValidator.Assert();

    it( 'should be an object', function () {
      expect( assert ).to.be.an( 'object' );
    } )

    it( 'should have "Assert" __class__', function () {
      expect( assert.__class__).to.be( 'Assert' );
    } )

    it( 'should have "Assert" __parentClass__', function () {
      expect( assert.__parentClass__).to.be( 'Assert' );
    } )

    it( 'should instanciate an assertion', function () {
      var Length = new jsValidator.Assert().Length( 10 );
      expect( Length ).to.be.an( 'object' );
      expect( Length.__class__ ).to.be( 'Length' );
      expect( assert.__parentClass__).to.be( 'Assert' );
    } )

    it( 'should register a group through assertion construct ', function () {
      var Length = new jsValidator.Assert().Length( 10, 15, 'foo' );
      expect( Length.hasGroups() ).to.be( true );
      expect( Length.hasGroup( 'foo' ) ).to.be( true );
    } )

    it( 'should register a group through addGroup ', function () {
      var Length = new jsValidator.Assert().Length( 10 ).addGroup( 'foo' );
      expect( Length.hasGroups() ).to.be( true );
      expect( Length.hasGroup( 'foo' ) ).to.be( true );
    } )

    it( 'should register mulitple groups through assertion construct', function () {
      var Length = new jsValidator.Assert().Length( 10, 15, [ 'foo', 'bar'] );
      expect( Length.hasGroups() ).to.be( true );
      expect( Length.hasGroup( 'foo' ) ).to.be( true );
      expect( Length.hasGroup( 'bar' ) ).to.be( true );
    } )

    it( 'should register mulitple groups through addGroups', function () {
      var Length = new jsValidator.Assert().Length( 10 ).addGroups( [ 'foo', 'bar'] );
      expect( Length.hasGroups() ).to.be( true );
      expect( Length.hasGroup( 'foo' ) ).to.be( true );
      expect( Length.hasGroup( 'bar' ) ).to.be( true );
    } )

    it( 'should register mulitple groups through chained addGroup', function () {
      var Length = new jsValidator.Assert().Length( 10 ).addGroup( 'foo' ).addGroup( 'bar' );
      expect( Length.hasGroups() ).to.be( true );
      expect( Length.hasGroup( 'foo' ) ).to.be( true );
      expect( Length.hasGroup( 'bar' ) ).to.be( true );
    } )

    it( 'should remove group', function () {
      var Length = new jsValidator.Assert().Length( 10 ).addGroup( 'foo' ).addGroup( 'bar' ).removeGroup( 'bar' );
      expect( Length.hasGroups() ).to.be( true );
      expect( Length.hasGroup( 'foo' ) ).to.be( true );
      expect( Length.hasGroup( 'bar' ) ).to.be( false );
    } )
  } )

  describe( 'Constraint', function () {
    var constraint = new jsValidator.Constraint();

    it( 'should be an object', function () {
      expect( constraint ).to.be.an( 'object' );
    } )

    it( 'should have "Constraint" __class__', function () {
      expect( constraint.__class__).to.be( 'Constraint' );
    } )

    it( 'should be instanciated without an assertion', function () {
      var myConstraint = new jsValidator.Constraint();
      expect( myConstraint.asserts.length ).to.be( 0 );
    } )

    it( 'should be instanciated with an assertion', function () {
      var myConstraint = new jsValidator.Constraint( new jsValidator.Assert().Length( 10 ) );
      expect( myConstraint.asserts.length ).to.be( 1 );
    } )

    it( 'should add an assertion', function () {
      var myConstraint = new jsValidator.Constraint();
      myConstraint.add( new jsValidator.Assert().Length( 10 ) );
      expect( myConstraint.asserts.length ).to.be( 1 );
    } )

    it( 'should return true with has assertion, not deep', function () {
      var myConstraint = new jsValidator.Constraint();
      myConstraint.add( new jsValidator.Assert().Length( 10 ) );
      expect( myConstraint.has( new jsValidator.Assert().Length( 15 ) ) ).to.be( true );
    } )

    it( 'should return true with has assertion, with deep', function () {
      var myConstraint = new jsValidator.Constraint();
      myConstraint.add( new jsValidator.Assert().Length( 10 ) );
      expect( myConstraint.has( new jsValidator.Assert().Length( 10 ), true ) ).to.be( true );
    } )

    it( 'should return false with has assertion, with deep', function () {
      var myConstraint = new jsValidator.Constraint();
      myConstraint.add( new jsValidator.Assert().Length( 10 ) );
      expect( myConstraint.has( new jsValidator.Assert().Length( 15 ), true ) ).to.be( false );
    } )

    it( 'should remove an assertion, not deep', function () {
      var myConstraint = new jsValidator.Constraint();
      myConstraint.add( new jsValidator.Assert().NotBlank() ).add( new jsValidator.Assert().Length( 10 ) );
      expect( myConstraint.asserts.length ).to.be( 2 );
      myConstraint.remove( new jsValidator.Assert().Length( 15 ) );
      expect( myConstraint.has( new jsValidator.Assert().NotBlank() ) ).to.be( true );
      expect( myConstraint.asserts.length ).to.be( 1 );
    } )

    it( 'should remove an assertion, with deep', function () {
      var myConstraint = new jsValidator.Constraint();
      myConstraint.add( new jsValidator.Assert().NotBlank() ).add( new jsValidator.Assert().Length( 10 ) );
      expect( myConstraint.asserts.length ).to.be( 2 );
      myConstraint.remove( new jsValidator.Assert().Length( 15 ), true );
      expect( myConstraint.asserts.length ).to.be( 2 );
      myConstraint.remove( new jsValidator.Assert().Length( 10 ), true );
      expect( myConstraint.asserts.length ).to.be( 1 );
    } )
  } )

  describe( 'Collection', function () {
    var collection = new jsValidator.Collection();

    it( 'should be an object', function () {
      expect( collection ).to.be.an( 'object' );
    } )

    it( 'should have "Collection" __class__', function () {
      expect( collection.__class__).to.be( 'Collection' );
    } )

    it( 'should be instanciated without a constraint', function () {
      var myCollection = new jsValidator.Collection();
      expect( myCollection.constraints.isEqualTo( {} ) ).to.be( true );
    } )

    it( 'should be instanciated with a constraint', function () {
      var myCollection = new jsValidator.Collection( { foo: new jsValidator.Constraint() } );
      expect( myCollection.constraints.isEqualTo( { foo: new jsValidator.Constraint() } ) ).to.be( true );
    } )

    it( 'should fail if not a Constraint in add method', function () {
      expect( new jsValidator.Collection().add ).to.throwError();
    } )

    it( 'should add a Constraint', function () {
      var myCollection = new jsValidator.Collection().add( 'foo', new jsValidator.Constraint() );
      expect( myCollection.has( 'foo' ) ).to.be( true );
    } )

    it( 'should force add a Constraint', function () {
      var myCollection = new jsValidator.Collection().add( 'foo', new jsValidator.Constraint( new jsValidator.Assert().Length( 10 ) ) );
      expect( myCollection.get( 'foo' ).isEqualTo( new jsValidator.Constraint( new jsValidator.Assert().Length( 10 ) ) ) ).to.be( true );
      myCollection.add( 'foo', new jsValidator.Constraint( new jsValidator.Assert().Length( 15 ) ) );
      expect( myCollection.get( 'foo' ).isEqualTo( new jsValidator.Constraint( new jsValidator.Assert().Length( 10 ) ) ) ).to.be( true );
      myCollection.add( 'foo', new jsValidator.Constraint( new jsValidator.Assert().Length( 35 ) ), true );
      expect( myCollection.get( 'foo' ).isEqualTo( new jsValidator.Constraint( new jsValidator.Assert().Length( 35 ) ) ) ).to.be( true );
    } )

    it( 'should remove a Constraint', function () {
      var myCollection = new jsValidator.Collection().add( 'foo', new jsValidator.Constraint() );
      expect( myCollection.has( 'foo' ) ).to.be( true );
      myCollection.remove( 'foo' );
      expect( myCollection.has( 'foo' ) ).to.be( false );
    } )

  } )
} )