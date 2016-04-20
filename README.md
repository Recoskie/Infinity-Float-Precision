# Infinity-Float-Precision
An high performance math library for super high precision floating decimal point math.

-----------------------------------------------------------------------------------------
Example Use.

  //*******************************start of example use*******************************

  var f1=new InfinityFloat("3.1415926535"); //change this to your selected number

  var f2=new InfinityFloat("3.1415926535"); //change this to your selected number

  out=f1.Mul(f2);

  alert(f1.GetValue()+"x"+f2.GetValue()+"="+out.GetValue());

  //*******************************example use of add*******************************

  f1=new InfinityFloat("3.1415926535"); //change this to your selected number

  f2=new InfinityFloat("3.1415926535"); //change this to your selected number

  out=f1.Add(f2);

  alert(f1.GetValue()+"+"+f2.GetValue()+"="+out.GetValue());

  //*******************************example use of subtract*******************************

  f1=new InfinityFloat("3.1415926535"); //change this to your selected number

  f2=new InfinityFloat("3.1415926535"); //change this to your selected number

  out=f1.Sub(f2);

  alert(f1.GetValue()+"-"+f2.GetValue()+"="+out.GetValue());

  //*******************************example use of Less than*******************************

  f1=new InfinityFloat("3.1415926535"); //change this to your selected number

  f2=new InfinityFloat("3.1415926534"); //change this to your selected number

  out=f1.IsLess(f2);

  alert(f1.GetValue()+"<"+f2.GetValue()+"="+out+"");

  //*******************************example use of Grater than*******************************

  f1=new InfinityFloat("3.1415926545"); //change this to your selected number

  f2=new InfinityFloat("3.1415926535"); //change this to your selected number

  out=f1.IsGrater(f2);

  alert(f1.GetValue()+">"+f2.GetValue()+"="+out+"");

-----------------------------------------------------------------------------------------
This math Library is 3 years old now.
-----------------------------------------------------------------------------------------

I originally designed it for a data analyzing algorithm that took an long time to create. This is because JavaScript's Double 64 float numbers did not have enough accuracy all the time.

The project I am talking about can be found though the following link: https://github.com/Recoskie/Number-Data-into-math-formula
