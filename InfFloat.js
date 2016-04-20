//**************************************Create Infinitely large Float Binary Numbers**************************************

function InfinityFloat( num )
{

  //The float Sing bit.

  S=0;

  //If the float is negative.

  if(num.substring(0,1)=="-")
  {
    S=1;
  }

  //Count 0 places on the left side of the number.

  var i=0;

  for(;i<num.length;i++)
  {
    if(num.substring(i,i+1)!=0)
    {break;}
  }

  //Remove the zero places.

  num=num.substring(i,num.length);

  //Find the decimal point.

  DecPoint=num.split(".")[0].length;

  //Find number of zero places on the right side of the decimal point.

  i=num.length;

  for(;i>DecPoint;i--)
  {
    if(num.substring(i,i+1)!=0)
    {break;}
  }

  //Remove 0 places from the right side of the decimal point.

  num=num.substring(0,i+1);

  //Remove the sing as it is stored as the sing bit.

  num=num.replace("-","");

  //Store the decimal point exponent.

  DecPoint=num.split(".")[0].length;

  //Remove the decimal point from the number as it is stored as the exponent.

  num=num.replace(".","");

  //If no number value is 0 Decimal point is right after 0.

  if( num === "" ) { num="0"; DecPoint++; }

  //Return the number, and it's function methods.

  return({

    //The sing bit.

    Sing:S,

    //The exponent.

    Point:DecPoint,

    //The value (Mantissa).

    NumData:num,

    //Method to Get the Value of the number.

    GetValue:func1,

    //Compare two numbers in sections in less than.

    IsLess:function( b ) { return( func2( this, b, 0 ) );},

    //The same compare algorithm is used, but using less than.

    IsGrater:function( b ) { return( func2( this, b, 1 ) ); },

    //Add two numbers.

    Add:function( b ) { return( func3( this, b ) ); },

    //Addition is the same as subtraction with one input inverted from it's sing bit.

    Sub:function( b )
    {
      t = new InfinityFloat( b.GetValue());
      t.Sing=!t.Sing;
      return(func3(this,t));
    },

    //Multiply by using grouped multiply.

    Mul:function(b){return(func4(this,b));}

  });

}

//*****************************************Get Infinitely large Number Value****************************************

function func1()
{
  S="";

  if( this.Sing ) { S = "-"; }

  S = S + this.NumData.substring(0,this.Point) + "." + this.NumData.substring(this.Point,this.NumData.length);

  if( S.substring(0,1) == "." ) { S = "0" + S; }

  return( S );
}

//************************************************Compare Numbers**************************************************

function func2( a, b, M )
{
  var N1=a.NumData, N2=b.NumData;
  var D1=a.Point, D2=b.Point;
  var S1="",S2="";

  if(a.Sing==1){S1="-";}
  if(b.Sing==1){S2="-";}

  for( var i = 0; i < ( D1 - D2 ); N2 = "0" + N2, i++ );
  for( var i = 0; i < ( D2 - D1 ); N1 = "0" + N1, i++ );

  for(; ( N2.length - N1.length ) > 0; N1 += "0" );
  for(; ( N1.length - N2.length ) > 0; N2 += "0" );

  while( N1.length > 0 )
  {
    V1 = new Number( S1 + N1.substring( 0, 9 ) ); V2 = new Number( S2 + N2.substring( 0, 9 ) );

    if(( V1 < V2 & !M ) | ( V1 > V2 & M ) ) { return(true); }
    else if( ( V1 + "" ) != ( V2 + "" ) ) { return(false); }

    N1 = N1.substring( 9, N1.length );
    N2 = N2.substring( 9, N2.length );
  }

  return(false);
}

//*******************************************Add Infinitely large Numbers*******************************************

function func3(t1,t2)
{
  var a=new InfinityFloat( t1.GetValue() );
  var b=new InfinityFloat( t2.GetValue() );

  if( a.NumData == "0" ){ return(b); }
  else if(b.NumData == "0" ){ return(a); }

  //The two numbers that will be added.

  var N1=a.NumData,N2=b.NumData;

  //The Decimal point of the two numbers.

  var D1=a.Point,D2=b.Point;



  var S1="",S2="",SingOut="",V1=0,V2=0,C=0,out1="",out2="",mp=0;

  if( a.Sing == 1 ){ S1 = "-"; }
  if( b.Sing == 1 ){ S2 = "-"; }
  if( a.Sing == 1 ){ a.Sing = 0; }
  if( b.Sing == 1 ){ b.Sing = 0; }

  //Add zeros to the right side of the long integer number so that the decimal points match this is called normalizing.

  for( var i=0; i < ( D1 - D2 ); N2 = "0" + N2, i++ );
  for( var i=0; i < ( D2 - D1 ); N1 = "0" + N1, i++ );
  for(; ( N2.length - N1.length ) > 0; N1 += "0" );
  for(; ( N1.length - N2.length ) > 0; N2 += "0" );

  //Logically add the Sing.

  if(a.IsLess(b))
  {
    if( ( S1 == "-" & S2 == "-") | S2 == "-" )
    {
      SingOut="-";
    }

    var t=N2;
    N2=N1;
    N1=t;
  }
  else if( S1=="-" | (S1 == "-" & S2 == "-" ) )
  {
    SingOut="-";
  }

  while( N1.length > 0 )
  {
    V1 = new Number( N1.substring( N1.length - 9, N1.length ) );
    V2 = new Number( N2.substring( N2.length - 9, N2.length ) );

    if( S1 != S2 )
    {
      out1 = ( V1 - V2 ) + C + "";
    }
    else
    {
      out1 = ( V1 + V2 ) + C + "";
    }

    if( C < 0 & out1 > 0 ) { C = 0; }

    if( new Number( out1 ) < 0 & S1 != S2 )
    {
      out1=( ( 1000000000 + V1 ) - ( V2 ) ) + C + "";
      C =- 1;
      out1 = out1.substring(out1.length-9,out1.length);
    }
    else
    {
      if( out1.length > 9 & N1.length != 9 )
      {
        C = 1;
        out1 = out1.substring( out1.length - 9, out1.length );
      }
      else{ C = 0; }
    }

    if( N1.length > 9 )
    {
      for(; out1.length < 9; out1 = "0" + out1 );
    }

    out2 = out1 + out2;

    if( N1.length <= 9 & out1.length > N1.length ){ mp=1; }

    N1 = N1.substring( 0, N1.length - 9 );
    N2 = N2.substring( 0, N2.length - 9 );
  }

  Point = Math.max( D1, D2 ) + mp;

  for( var i = out2.length; i < Math.max( t1.NumData.length, t2.NumData.length ); out2 = "0" + out2, i++ );

  out2 = out2.substring(0,Point) + "." + out2.substring( Point, out2.length );

  var i=0;

  for(; i < out2.length; i++ )
  {
    if( out2.substring( i, i + 1 ) != 0 ) { break; }
  }
  out2 = out2.substring( i, out2.length );
  i = out2.length;
  for(; i > Math.max( D1, D2 ); i-- ) { if( out2.substring( i, i + 1 ) != 0 ) { break; } }

  out2=out2.substring(0,i+1);

  return( new InfinityFloat( SingOut + out2 ) );
}

//****************************************************Multiply*****************************************************

function func4( t1, t2 )
{
  if(t1.NumData == "0" | t2.NumData == "0" ) { return( new InfinityFloat("0") ); }
  if(t1.NumData == "1" ) { return(t2); }
  else if( t2.NumData == "1" ){ return(t1); }

  var a=new InfinityFloat(t1.GetValue()),b=new InfinityFloat(t2.GetValue());
  var N1=a.NumData,N2=b.NumData;
  var D1=a.Point,D2=b.Point;
  var SingOut="";
  var V1=0,V2=0;
  var PlacePoint1=0,PlacePoint2=0;
  var out1="0",out2="";
  var parts=new Array(); //each group multiply in parts to be added together.
  var size=0;

  var DecPoint1 = ( N1.length - D1 ) + ( N2.length - D2 );
  var DecPoint2 = 0;

  if( a.Sing != b.Sing ) { SingOut = "-"; }

  //Normalize.

  for(var i=0;i<(D1-D2);N2="0"+N2,i++);
  for(var i=0;i<(D2-D1);N1="0"+N1,i++);
  i=0;
  for(;(N2.length-N1.length)>0;N1+="0",i++);
  if(i>DecPoint2){DecPoint2=i;}
  i=0;
  for(;(N1.length-N2.length)>0;N2+="0",i++);
  if(i>DecPoint2){DecPoint2=i;}

  //When Multiplying the decimal points add.

  DecPoint2+=DecPoint1;
  size=N1.length;

  while(PlacePoint2<size)
  {

    V1=new Number(N1.substring((N1.length-PlacePoint2)-4,N1.length-PlacePoint2));

    if(V1!=0)
    {
      while(PlacePoint1<size)
      {
        V2=new Number(N2.substring((N2.length-PlacePoint1)-4,N2.length-PlacePoint1));

        if(V2!=0)
        {
          out2= ( V1 * V2 ) + "";
          for(var i=0;i<PlacePoint1;out2+="0",i++);
          t3 = new InfinityFloat(out2);
          t4 = new InfinityFloat(out1);
          t3 = t3.Add(t4);
          out1 = t3.NumData;
        }
        PlacePoint1+=4;
      }

      for( var i=0; i < PlacePoint2; out1 += "0", i++ );
      while( out1.length <= DecPoint2 ){ out1 = "0" + out1; }
      out1 = out1.substring( 0, out1.length - DecPoint2 ) + "." + out1.substring( out1.length - DecPoint2, out1.length );
      parts[ parts.length ] = out1; out1 = "0";
    }
    PlacePoint1=0;PlacePoint2+=4;}

    var out1="0",out2="0";

    a=new InfinityFloat(out1);

    for(var i=0;i<parts.length;i++)
    {
      b=new InfinityFloat(parts[i]);
      a=a.Add(b);
    }

    return(new InfinityFloat(SingOut+a.GetValue()));
  }
