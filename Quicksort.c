/* This program demonstrates the use of the C library function
 * "qsort" which is defined as
 *
 * void qsort (void *base, size_t nmemb, size_t size,
 *	       int (*compare) (const void *, const void *));
 * base:     pointer to first element of array
 * nmemb:    number of elements in array
 * size:     size of one array element
 * compare:  pointer to function to compare two elements
 *	       "compare" will be called with two arguments that
 *		point to the objects which should be compared.
 *
 *
 * Compiling:
 *   cc  -o Quicksort Quicksort.c	("standard" C compiler)
 *   gcc -o Quicksort Quicksort.c	(GNU C compiler)
 *
 * Running:
 *   ./Quicksort			(UNIX)
 *   ./Quicksort.exe			(Cygwin)
 *
 *
 * File: Quicksort.c			Author: S. Gross
 * Date: 23.12.2011
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static void print_list (int num_elem, char *list[]);
static int  comp_asc   (char **ptr1, char **ptr2);	/* ascending	*/
static int  comp_desc  (char **ptr1, char **ptr2);	/* descending	*/

int main (void)
{
  char *list[] = {"This", "program", "demonstrates", "the", "use",
		  "of", "the", "C", "library", "function", "qsort"};
  int  num_elem;			/* number of list elements	*/

  num_elem = sizeof (list) / sizeof (list[0]);
  printf ("Original list:\n");
  print_list (num_elem, list);
  qsort (list, num_elem, sizeof (list[0]),
	 (int (*) (const void *, const void *)) comp_asc);
  printf ("List sorted in ascending order:\n");
  print_list (num_elem, list);
  qsort (list, num_elem, sizeof (list[0]),
	 (int (*) (const void *, const void *)) comp_desc);
  printf ("List sorted in descending order:\n");
  print_list (num_elem, list);
  return EXIT_SUCCESS;
}


/* Print strings of an array of pointers to strings.
 *
 * Input parameter:  num_elem	number of elements in array
 *		     list	pointer to first element in array
 * Output parameter: none
 * Return value:     none
 * Side effects:     none
 *
 */

void print_list (int num_elem, char *list[])
{
  int i;				/* loop variable		*/

  for (i = 0; i < num_elem; i++)
  {
    printf ("  list[%d]: %s\n", i, list[i]);
  }
  printf ("\n");
}


/* Compares two strings.
 *
 * Input parameter:  ptr1	pointer to first string
 *		     ptr2	pointer to second string
 * Output parameter: none
 * Return value:     -1		1st string <  2nd string
 *		      0		1st string == 2nd string
 *		     +1		1st string >  2nd string
 * Side effects:     none
 *
 */

int comp_asc (char **ptr1, char **ptr2)
{
  return (strcmp (*ptr1, *ptr2));
}


/* Print a short message.
 *
 * Input parameter:  ptr1	pointer to first string
 *		     ptr2	pointer to second string
 * Output parameter: none
 * Return value:     -1		1st string >  2nd string
 *		      0		1st string == 2nd string
 *		     +1		1st string <  2nd string
 * Side effects:     none
 *
 */

int comp_desc (char **ptr1, char **ptr2)
{
  return -(strcmp (*ptr1, *ptr2));
}
